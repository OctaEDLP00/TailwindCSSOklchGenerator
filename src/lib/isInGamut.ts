import type { OKLCH } from '~/types'
import { oklabToLinearRgb } from './oklabToLinearRgb'
import { oklchToOklab } from './oklchToOklab'

/**
 * Checks if an OKLCH color is within sRGB gamut
 * @param {import('../types/index.d.ts').OKLCH} lch - OKLCH values
 * @returns {boolean} True if in gamut
 */
export function isInGamut(lch: OKLCH): boolean {
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
