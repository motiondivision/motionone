export interface Target {
  [key: string]: string | number
}

export interface AnimationState {
  update: (options: Options) => void
  getDepth: () => number
  getTarget: () => Variant
  getOptions: () => Options
  mount: (element: Element) => void
  unmount: () => void
}

export interface Options {
  initial?: VariantDefinition
  animate?: VariantDefinition
  inView?: VariantDefinition
  hover?: VariantDefinition
  press?: VariantDefinition
  variants?: Variants
}

export interface Variants {}

export interface Variant {}

export type VariantDefinition = Variant | string
