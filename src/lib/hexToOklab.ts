import type { OKLab } from '~/types'
import { hexToRgb } from './hexToRGB'
import { srgbToLinear } from './srgbToLinear'

/**
 * Converts HEX color to OKLab color space
 * @param {string} hex - HEX color string
 * @returns {import('../types/index.d.ts').OKLab} OKLab values
 */
export function hexToOklab(hex: string): OKLab {
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
