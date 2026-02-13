import { linearToSrgb } from './linearToSrgb'
import { oklabToLinearRgb } from './oklabToLinearRgb'
import { oklchToOklab } from './oklchToOklab'

/**
 * Converts OKLCH to HEX color
 * @param {import('../types/index.d.ts').OKLCH} lch - OKLCH values
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
