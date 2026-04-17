export type RGB = [r: number, g: number, b: number]

export interface ColorScaleItem {
  shade: number
  oklch: { L: number | undefined; C: number; H: number }
  css: string
  hex: string
}

export type ColorScale = Array<ColorScaleItem>
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
