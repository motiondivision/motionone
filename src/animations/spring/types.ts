export interface PhysicsSpringOptions {
  velocity?: number
  stiffness?: number
  damping?: number
  mass?: number
}

export interface SpringOptions extends PhysicsSpringOptions {
  from?: number
  to?: number
  duration?: number
  bounce?: number
  restSpeed?: number
  restDelta?: number
}

export interface AnimationState<V> {
  value: V
  done: boolean
  velocity: number
}

export interface AnimationGenerator<V> {
  next: (t: number) => AnimationState<V>
}
