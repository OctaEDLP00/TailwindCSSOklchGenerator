import { CHROMA_JITTER, LIGHTNESS_SCALE, SHADE_NUMBERS } from '~/constants'
import { hexToOklch } from '../hexToOklch'
import { clampChromaToGamut } from '../clampChromaToGamut'
import { formatOklch } from '../formatOklch'
import { oklchToHex } from '../oklchToHex'

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
