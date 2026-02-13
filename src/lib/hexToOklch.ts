import type { OKLCH } from '~/types'
import { hexToOklab } from './hexToOklab'
import { oklabToOklch } from './oklabToOklch'

/**
 * Converts HEX color to OKLCH color space
 * @param {string} hex - HEX color string
 * @returns {import('../types/index.d.ts').OKLCH} OKLCH values
 */
export function hexToOklch(hex: string): OKLCH {
  const lab = hexToOklab(hex)
  return oklabToOklch(lab)
}
