import type { OKLab, OKLCH } from '~/types'

/**
 * Converts OKLCH to OKLab color space
 * @param {import('../types/index.d.ts').OKLCH} lch - OKLCH values
 * @returns {import('../types/index.d.ts').OKLab} OKLab values
 */
export function oklchToOklab(lch: OKLCH): OKLab {
  const { L, C, H } = lch
  const hRad = H * (Math.PI / 180)
  return {
    L: L ?? 0,
    a: C * Math.cos(hRad),
    b: C * Math.sin(hRad),
  }
}
