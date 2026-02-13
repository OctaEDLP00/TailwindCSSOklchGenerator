/**
 * Validates and normalizes a HEX color
 * @param {string} hex - Input HEX string
 * @returns {string|null} Normalized HEX or null if invalid
 */
export function normalizeHex(hex: string): string | null {
  const cleaned = hex.trim().replace(/^#/, '')

  // Check for valid 3 or 6 character hex
  if (/^[0-9A-Fa-f]{3}$/.test(cleaned)) {
    return (
      '#' +
      cleaned
        .split('')
        .map(c => c + c)
        .join('')
    )
  }
  if (/^[0-9A-Fa-f]{6}$/.test(cleaned)) {
    return '#' + cleaned
  }

  return null
}
