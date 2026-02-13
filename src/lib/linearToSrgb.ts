/**
 * Converts linear RGB to sRGB
 * @param {number} value - Linear RGB value (0-1)
 * @returns {number} sRGB value (0-255)
 */
export function linearToSrgb(value: number): number {
  const v = Math.max(0, Math.min(1, value))
  const srgb = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055
  return Math.round(srgb * 255)
}
