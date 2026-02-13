import type { generateScale } from '~/lib/lib'

export type RGB = [r: number, g: number, b: number]
export type ColorScale = ReturnType<typeof generateScale>
export interface OKLab {
  L: number
  a: number
  b: number
}
export interface OKLCH {
  L: number | undefined
  C: number
  H: number
}
export interface Shade {
  shade: number
  color: string
}
