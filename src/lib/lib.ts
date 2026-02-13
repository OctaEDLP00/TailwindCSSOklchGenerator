/**
 * @fileoverview Tailwind OKLCH Lab - Color scale generator with OKLCH color space
 * @description Generates perceptually uniform color scales for Tailwind CSS
 */
// ============================================================================
// CONSTANTS
// ============================================================================
export { CHROMA_JITTER, LIGHTNESS_SCALE, SHADE_NUMBERS } from '../constants'
// ============================================================================
// COLOR CONVERSION FUNCTIONS
// ============================================================================
export { clampChromaToGamut } from './clampChromaToGamut'
export { formatOklch } from './formatOklch'
export { hexToOklab } from './hexToOklab'
export { hexToOklch } from './hexToOklch'
export { hexToRgb } from './hexToRGB'
export { isInGamut } from './isInGamut'
export { linearToSrgb } from './linearToSrgb'
export { oklabToLinearRgb } from './oklabToLinearRgb'
export { oklabToOklch } from './oklabToOklch'
export { oklchToHex } from './oklchToHex'
export { oklchToOklab } from './oklchToOklab'
export { srgbToLinear } from './srgbToLinear'
// ============================================================================
// SCALE GENERATION
// ============================================================================
export { generateScale } from './generation/generateScale'
// ============================================================================
// UI FUNCTIONS
// ============================================================================
export { normalizeHex } from './ui/normalizeHex'
