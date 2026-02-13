import type { OKLCH } from '~/types'

/**
 * Formats OKLCH values as a CSS string
 * @param {import('../types/index').OKLCH} lch - OKLCH values
 * @returns {string} CSS OKLCH string
 */
export function formatOklch(lch: OKLCH): string {
  const { L, C, H } = lch
  const defaultValue = 0
  const l = (L ?? defaultValue * 100).toFixed(2)
  const c = C.toFixed(4)
  const h = H.toFixed(2)
  return `oklch(${l}% ${c} ${h})`
}
