import type { RGB } from '~/types'

/**
 * Converts OKLab to linear RGB
 * @param {{L: number, a: number, b: number}} lab - OKLab values
 * @returns {import('../types/index.d.ts').RGB} Linear RGB values (0-1)
 */
export function oklabToLinearRgb(lab: { L: number; a: number; b: number }): RGB {
  const { L, a, b } = lab

  // OKLab to LMS
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  // Cube
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  // LMS to RGB
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}
