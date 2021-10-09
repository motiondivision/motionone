export interface GlideOptions {
  // TODO: Look into these namings
  power?: number
  timeConstant?: number
  modifyTarget?: (v: number) => number

  max?: number
  min?: number
  bounceDamping?: number
  bounceStiffness?: number
  restSpeed?: number
  restDistance?: number
  from?: number
  to?: number
  velocity?: number
}
