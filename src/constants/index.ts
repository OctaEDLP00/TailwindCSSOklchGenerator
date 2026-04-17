// ============================================================================
// CONSTANTS
// ============================================================================

/** @type {Array<number>} Tailwind shade numbers */
export const SHADE_NUMBERS: Array<number> = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

/**
 * @type {Array<number | null>} Non-linear lightness distribution for the scale
 * Based on OKLCH reference values:
 * 50: 0.9778, 100: 0.9356, 200: 0.8811, 300: 0.8267, 400: 0.7422,
 * 500: 0.6478 (base color lightness), 600: 0.5733, 700: 0.4689, 800: 0.3944, 900: 0.32, 950: 0.2378
 */
export const LIGHTNESS_SCALE: Array<number> = [
  0.9778, 0.9356, 0.8811, 0.8267, 0.7422, 0.6478, 0.5733, 0.4689, 0.3944, 0.32, 0.2378,
] as const

/**
 * @type {Array<number>} Chroma multipliers for jitter (reduces at extremes)
 * Based on OKLCH chroma progression:
 * Peaks at 500-600 (1.0), reduces towards 50 (0.055) and 950 (0.388)
 * Values: 0.0108, 0.0321, 0.0609, 0.0908, 0.1398, 0.1472, 0.1299, 0.1067, 0.0898, 0.0726, 0.054,
 */
export const CHROMA_JITTER: Array<number> = [
  0.0108, 0.0321, 0.0609, 0.0908, 0.1398, 0.1472, 0.1299, 0.1067, 0.0898, 0.0726, 0.054,
] as const

// Valores por defecto para SSR
export const DEFAULT_COLOR = '#ef4444'
