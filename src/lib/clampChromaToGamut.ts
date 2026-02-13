import { isInGamut } from './isInGamut'

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
