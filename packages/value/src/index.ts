/**
 * A MotionValue contains the state of a single animatable value.
 */
export class MotionValue<V> {
  constructor(initial: V) {
    this.current = initial
  }

  current: V
}
