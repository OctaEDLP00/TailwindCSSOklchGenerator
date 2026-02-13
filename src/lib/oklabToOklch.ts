import type { OKLab, OKLCH } from '~/types'

/**
 * Converts OKLab to OKLCH color space
 * @param {import('../types/index.d.ts').OKLab} lab - OKLab values
 * @returns {import('../types/index.d.ts').OKLCH} OKLCH values
 */
export function oklabToOklch(lab: OKLab): OKLCH {
  const { L, a, b } = lab
  const C = Math.sqrt(a * a + b * b)
  let H = Math.atan2(b, a) * (180 / Math.PI)
  if (H < 0) H += 360

  return { L, C, H }
}
