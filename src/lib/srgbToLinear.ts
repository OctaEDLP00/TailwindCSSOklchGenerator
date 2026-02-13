/**
 * Converts sRGB value to linear RGB
 * @param {number} value - sRGB value (0-255)
 * @returns {number} Linear RGB value (0-1)
 */
export function srgbToLinear(value: number): number {
  const v = value / 255
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}
