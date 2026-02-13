import type { RGB } from '~/types'

/**
 * Converts a HEX color string to RGB values (0-255)
 * @param {string} hex - HEX color string (e.g., "#3b82f6" or "3b82f6")
 * @returns {import('../types/index.d.ts').RGB} RGB values
 */
export function hexToRgb(hex: string): RGB {
  const cleaned = hex.replace(/^#/, '')
  const expanded =
    cleaned.length === 3 ?
      cleaned
        .split('')
        .map(c => c + c)
        .join('')
    : cleaned

  const num = parseInt(expanded, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}
