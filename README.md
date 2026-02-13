# OKLCH Color Scale Generator

<!-- WEBSITE IMAGE - Place a screenshot of the application here -->
<!-- Example: ![OKLCH Color Scale Generator](./screenshot.png) -->

![User interface showing controls and color palette](./tailwind-oklch-generator-preview.png)

A perceptually uniform color scale generator using the OKLCH color space. Create Tailwind CSS compatible color palettes with better perceptual uniformity than traditional HSL or RGB.

**[Español](./README.ES.md)** | English

## 🎨 Features

- **OKLCH Color Space**: Generate colors with superior perceptual uniformity
- **Automatic Scales**: Create 11-tone scales (50-950) automatically
- **Customization**: Manually adjust Chroma and Hue for precise results
- **Real-time Generation**: Palette updates automatically when modifying values
- **CSS Export**: Generate CSS code ready to use with Tailwind CSS v4
- **sRGB Compatibility**: Colors automatically adjust to stay within gamut
- **Expo-style Icons**: Icon system inspired by @expo/vector-icons
<!--

## 🚀 Demo

Visit live demo: [Your deploy URL]
-->

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/okl-chroma.git
cd okl-chroma

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🛠️ Technologies

- [Astro](https://astro.build/) - Modern web framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [OKLCH Color Space](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) - Perceptually uniform color space
- [Astro Expressive Code](https://expressive-code.com/) - Syntax highlighting
- [TypeScript](https://www.typescriptlang.org/) - Static typing

## 📁 Project Structure

```
okl-chroma/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── ui/            # UI components (IconSymbol, Link)
│   │   ├── Header.astro
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── layouts/           # Astro layouts
│   │   └── Layout.astro
│   ├── lib/              # Logic and utilities
│   │   └── index.ts      # OKLCH conversion functions
│   ├── pages/            # Application routes
│   │   ├── index.astro   # Main page
│   │   └── api/          # API routes
│   │       └── render-code.ts
│   ├── sections/         # Page sections
│   │   ├── Controls.astro
│   │   └── PalettePreview.astro
│   ├── constants/        # Application constants
│   │   └── index.ts      # Icon mapping and configuration
│   └── types/            # Type definitions
│       └── index.d.ts
├── package.json
└── README.md
```

## 🎯 Usage

### 1. Generate a Color Scale

1. Enter a HEX color in the input field (e.g., `#3b82f6`)
2. Adjust the **Chroma** and **Hue** sliders if desired
3. The palette generates automatically in real-time

### 2. Customize Values

- **Chroma**: Controls color saturation (0 - 0.4)
- **Hue**: Adjusts the color hue (0° - 360°)

### 3. Export to Tailwind CSS

The code block automatically generates CSS variables compatible with Tailwind CSS v4:

```css
@theme {
  --color-custom-50: oklch(97.1% 0.013 17.38);
  --color-custom-100: oklch(93.6% 0.032 17.72);
  /* ... more colors ... */
  --color-custom-950: oklch(25.8% 0.0092 26.04);
}
```

## 🔧 Development

### Available Commands

| Command            | Description                                   |
| ------------------ | --------------------------------------------- |
| `pnpm dev`         | Starts development server at `localhost:4321` |
| `pnpm build`       | Compiles for production in `./dist/`          |
| `pnpm preview`     | Previews the build locally                    |
| `pnpm astro check` | Checks TypeScript types                       |

### Color System Architecture

The project implements a color scale generation system based on OKLCH:

1. **LIGHTNESS_SCALE**: Non-linear luminosity distribution (50-950)
2. **CHROMA_JITTER**: Multipliers that reduce chroma at extremes
3. **OKLCH Conversion**:
   - HEX → OKLab → OKLCH
   - Chroma adjustment according to jitter
   - Clamping to sRGB gamut
   - OKLCH → OKLab → HEX

## 📝 API

### `generateScale(hex, chromaOverride?, hueOverride?)`

Generates a complete color scale from a base color.

```typescript
import { generateScale } from '~/lib'

const scale = generateScale('#3b82f6', 0.2, 180)
// Returns: Array<{ shade, oklch, css, hex }>
```

### Conversion Functions

- `hexToOklch(hex)` - Converts HEX to OKLCH
- `oklchToHex(lch)` - Converts OKLCH to HEX
- `hexToOklab(hex)` - Converts HEX to OKLab
- `normalizeHex(hex)` - Validates and normalizes HEX colors

## 📄 License

MIT License - see [LICENSE](./LICENSE) for more details.

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📚 Resources

- [OKLCH Color Picker](https://oklch.com/)
- [Tailwind CSS OKLCH Guide](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Astro Documentation](https://docs.astro.build/)

---

Built with ❤️ using Astro and OKLCH
