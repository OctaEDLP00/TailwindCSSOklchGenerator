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

// Valores por defecto para SSR
export const DEFAULT_COLOR = '#ef4444'
