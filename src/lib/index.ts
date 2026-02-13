/**
 * @fileoverview Tailwind OKLCH Lab - Color scale generator with OKLCH color space
 * @description Generates perceptually uniform color scales for Tailwind CSS
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/** @type {Array<number>} Tailwind shade numbers */
export const SHADE_NUMBERS: Array<number> = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

/** @type {Array<number | null>} Non-linear lightness distribution for the scale
 * Based on OKLCH reference values:
 * 50: 0.971, 100: 0.936, 200: 0.885, 300: 0.808, 400: 0.704,
 * 500: null (base color lightness), 600: 0.577, 700: 0.505, 800: 0.444, 900: 0.396, 950: 0.258
 */
export const LIGHTNESS_SCALE: Array<number | null> = [
  97.78, 93.56, 88.11, 82.67, 74.22, 64.78, 57.33, 46.89, 39.44, 32, 23.78,
] as const

/** @type {Array<number>} Chroma multipliers for jitter (reduces at extremes)
 * Based on OKLCH chroma progression:
 * Peaks at 500-600 (1.0), reduces towards 50 (0.055) and 950 (0.388)
 * Values: 0.013, 0.032, 0.062, 0.114, 0.191, 0.237, 0.245, 0.213, 0.177, 0.141, 0.092
 */
export const CHROMA_JITTER: Array<number> = [
  0.0108, 0.0321, 0.0609, 0.0908, 0.1398, 0.1472, 0.1299, 0.1067, 0.0898, 0.0726, 0.054,
] as const

// ============================================================================
// COLOR CONVERSION FUNCTIONS
// ============================================================================

type RGB = [r: number, g: number, b: number]

/**
 * Converts a HEX color string to RGB values (0-255)
 * @param {string} hex - HEX color string (e.g., "#3b82f6" or "3b82f6")
 * @returns {RGB} RGB values
 */
export function hexToRgb(hex: string): RGB {
  const cleaned = hex.replace(/^#/, '')
  const expanded =
    cleaned.length === 3 ?
      cleaned
        .split('')
        .map(c => c + c)
        .join('')
    : cleaned

  const num = parseInt(expanded, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

/**
 * Converts sRGB value to linear RGB
 * @param {number} value - sRGB value (0-255)
 * @returns {number} Linear RGB value (0-1)
 */
export function srgbToLinear(value: number): number {
  const v = value / 255
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

/**
 * Converts linear RGB to sRGB
 * @param {number} value - Linear RGB value (0-1)
 * @returns {number} sRGB value (0-255)
 */
export function linearToSrgb(value: number): number {
  const v = Math.max(0, Math.min(1, value))
  const srgb = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055
  return Math.round(srgb * 255)
}

/**
 * Converts HEX color to OKLab color space
 * @param {string} hex - HEX color string
 * @returns {{L: number, a: number, b: number}} OKLab values
 */
export function hexToOklab(hex: string): { L: number; a: number; b: number } {
  const [r, g, b] = hexToRgb(hex)

  // Convert to linear RGB
  const convertedR = srgbToLinear(r)
  const convertedG = srgbToLinear(g)
  const convertedB = srgbToLinear(b)

  // RGB to LMS (using OKLab matrix)
  const l = 0.4122214708 * convertedR + 0.5363325363 * convertedG + 0.0514459929 * convertedB
  const m = 0.2119034982 * convertedR + 0.6806995451 * convertedG + 0.1073969566 * convertedB
  const s = 0.0883024619 * convertedR + 0.2817188376 * convertedG + 0.6299787005 * convertedB

  // Cube root
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  // LMS to OKLab
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  }
}

/**
 * Converts OKLab to linear RGB
 * @param {{L: number, a: number, b: number}} lab - OKLab values
 * @returns {{r: number, g: number, b: number}} Linear RGB values (0-1)
 */
export function oklabToLinearRgb(lab: { L: number; a: number; b: number }): RGB {
  const { L, a, b } = lab

  // OKLab to LMS
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  // Cube
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  // LMS to RGB
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

/**
 * Converts OKLab to OKLCH color space
 * @param {{L: number, a: number, b: number}} lab - OKLab values
 * @returns {{L: number, C: number, H: number}} OKLCH values
 */
export function oklabToOklch(lab: { L: number; a: number; b: number }): {
  L: number
  C: number
  H: number
} {
  const { L, a, b } = lab
  const C = Math.sqrt(a * a + b * b)
  let H = Math.atan2(b, a) * (180 / Math.PI)
  if (H < 0) H += 360

  return { L, C, H }
}

/**
 * Converts OKLCH to OKLab color space
 * @param {{L: number, C: number, H: number}} lch - OKLCH values
 * @returns {{L: number, a: number, b: number}} OKLab values
 */
export function oklchToOklab(lch: { L: number; C: number; H: number }): {
  L: number
  a: number
  b: number
} {
  const { L, C, H } = lch
  const hRad = H * (Math.PI / 180)
  return {
    L,
    a: C * Math.cos(hRad),
    b: C * Math.sin(hRad),
  }
}

/**
 * Converts HEX color to OKLCH color space
 * @param {string} hex - HEX color string
 * @returns {{L: number, C: number, H: number}} OKLCH values
 */
export function hexToOklch(hex: string): { L: number; C: number; H: number } {
  const lab = hexToOklab(hex)
  return oklabToOklch(lab)
}

/**
 * Converts OKLCH to HEX color
 * @param {{L: number, C: number, H: number}} lch - OKLCH values
 * @returns {string} HEX color string
 */
export function oklchToHex(lch: { L: any; C: number; H: number }): string {
  const lab = oklchToOklab(lch)
  const [r, g, b] = oklabToLinearRgb(lab)

  const _r = linearToSrgb(r)
  const _g = linearToSrgb(g)
  const _b = linearToSrgb(b)

  return '#' + [_r, _g, _b].map(v => v.toString(16).padStart(2, '0')).join('')
}

/**
 * Formats OKLCH values as a CSS string
 * @param {{L: number, C: number, H: number}} lch - OKLCH values
 * @returns {string} CSS OKLCH string
 */
export function formatOklch(lch: { L: number | undefined; C: number; H: number }): string {
  const { L, C, H } = lch
  const defaultValue = 0
  const l = (L ?? defaultValue * 100).toFixed(2)
  const c = C.toFixed(4)
  const h = H.toFixed(2)
  return `oklch(${l}% ${c} ${h})`
}

/**
 * Checks if an OKLCH color is within sRGB gamut
 * @param {{L: number, C: number, H: number}} lch - OKLCH values
 * @returns {boolean} True if in gamut
 */
export function isInGamut(lch: { L: number; C: number; H: number }): boolean {
  const lab = oklchToOklab(lch)
  const [r, g, b] = oklabToLinearRgb(lab)
  const epsilon = 0.0001
  return (
    r >= -epsilon &&
    r <= 1 + epsilon &&
    g >= -epsilon &&
    g <= 1 + epsilon &&
    b >= -epsilon &&
    b <= 1 + epsilon
  )
}

/**
 * Clamps chroma to stay within sRGB gamut
 * @param {number} L - Lightness value
 * @param {number} C - Target chroma
 * @param {number} H - Hue value
 * @returns {number} Clamped chroma value
 */
export function clampChromaToGamut(L: number, C: number, H: number): number {
  let low = 0
  let high = C

  // Binary search for maximum in-gamut chroma
  while (high - low > 0.0001) {
    const mid = (low + high) / 2
    if (isInGamut({ L, C: mid, H })) {
      low = mid
    } else {
      high = mid
    }
  }

  return low
}

// ============================================================================
// SCALE GENERATION
// ============================================================================

/**
 * Generates a Tailwind color scale from a base color
 * @param {string} hex - Base HEX color
 * @param {number|null} chromaOverride - Optional chroma override
 * @param {number|null} hueOverride - Optional hue override
 * @returns {Array<{shade: number | undefined, oklch: {L: number, C: number, H: number}, css: string}>}
 */
export function generateScale(
  hex: string,
  chromaOverride: number | null = null,
  hueOverride: number | null = null,
): Array<{
  shade: number
  oklch: { L: number | undefined; C: number; H: number }
  css: string
  hex: string
}> {
  const base = hexToOklch(hex)
  const baseC = chromaOverride !== null ? chromaOverride : base.C
  const baseH = hueOverride !== null ? hueOverride : base.H

  return SHADE_NUMBERS.map((shade, index) => {
    // Use base lightness for 500, otherwise use the scale
    const L = LIGHTNESS_SCALE[index] !== null ? LIGHTNESS_SCALE[index] : base.L

    // Apply chroma jitter
    let C = baseC * CHROMA_JITTER[index]!

    // Use the hue
    const H = baseH

    // Clamp chroma to gamut
    C = clampChromaToGamut(L ?? 0, C, H)

    const oklch = { L, C, H }

    return {
      shade,
      oklch,
      css: formatOklch(oklch),
      hex: oklchToHex(oklch),
    }
  })
}

// ============================================================================
// UI FUNCTIONS
// ============================================================================

/**
 * Validates and normalizes a HEX color
 * @param {string} hex - Input HEX string
 * @returns {string|null} Normalized HEX or null if invalid
 */
export function normalizeHex(hex: string): string | null {
  const cleaned = hex.trim().replace(/^#/, '')

  // Check for valid 3 or 6 character hex
  if (/^[0-9A-Fa-f]{3}$/.test(cleaned)) {
    return (
      '#' +
      cleaned
        .split('')
        .map(c => c + c)
        .join('')
    )
  }
  if (/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
    return '#' + cleaned
  }

  return null
}
