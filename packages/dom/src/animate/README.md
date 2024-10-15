animate
`animate` can animate a DOM element or multiple elements to a set of CSS styles:

```ts
import { animate } from "motion"

// Animate via selector
animate(".box", { x: 100 }, { duration: 1 })

// Animate element or array of elements
const boxes = document.querySelectorAll(".box")
animate(boxes, { opacity: 0 }, { easing: "ease-out" })
```

It can also accept a function, which outputs a progress value between 0 and 1, which you can use to animate anything:

```ts
import { animate } from "motion"

animate(
  (progress) => {
    box.innerHTML = progress
  },
  { duration: 0.5 }
)
```

### Keyframes

By passing a single keyframe, the element will animate from its current style to those defined in the keyframe:

```ts
animate(element, { opacity: 1, transform: "rotate(360deg)" })
```

### Multiple keyframes

By defining a value as an array, it'll animate through each keyframe in turn:

```ts
animate(element, {
  transform: ["rotate(90deg)", "translateX(100px) rotate(45deg)", "none"],
})
```

### Wildcards

`null` is a special wildcard. As the first keyframe, it'll be replaced by the current value as read from the DOM.

```ts
element.style.opacity = "0.5"

animate(element, {
  opacity: [null, 0.8, 1], // 0.5, 0.8, 1
})
```

Subsequent null values will be replaced by the previous keyframe. Useful for keeping a style static for some of the animation. This way, you only have to change it in one place if you want to tweak the animation.

```ts
animate(element, {
  x: [0, 100, null], // 0, 100, 100
})
```

### Custom keyframes: Timing

By default, each of these keyframes will be spaced evenly throughout the animation. It's also possible to specify a list of offsets, values between 0 and 1, that defines a relative point in the animation a specific keyframe should be hit:

```ts
animate(
  element,
  {
    transform: ["rotate(90deg)", "translateX(100px) rotate(45deg)", "none"],
  },
  {
    offset: [0, 0.25, 1],
  }
)
```

If there are fewer keyframes than offsets defined in offset, the other keyframes will be spaced evenly:

```ts
animate(
  element,
  { color: ["red", "yellow", "green", "blue"] },
  { offset: [0, 0.2] } // [...0.6, 1])
)
```

### Custom keyframes: Easing

By default, easing will apply to the progress of whole animation. It's also possible to define easing between specific keyframes by defining an easing option as any array:

```ts
animate(
  element,
  { color: ["red", "yellow", "green", "blue"] },
  { easing: ["ease-in", "linear", "ease-out"] }
)
```

## Options

Options can be defined either for all values:

```ts
animate(
  element,
  { opacity: 0, color: ["red", "yellow", "green", "blue"] },
  { duration: 2 }
)
```

Or overridden for individual values:

```ts
animate(
  element,
  { opacity: 0, color: ["red", "yellow", "green", "blue"] },
  {
    duration: 2,
    ease: "linear",
    opacity: { duration: 0.4 },
  }
)
```

### `duration`

Default: 0.3

A duration, in seconds, that the animation will take to complete.

```ts
animate(element, { backgroundColor: "red" }, { duration: 2 })
```

### `delay`

Default: 0

A duration, in seconds, that the animation will be delayed before starting.

```ts
animate(element, { backgroundColor: "red" }, { delay: 0.5 })
```

When animating multiple elements, the stagger function can be used to offset the delay by increasing amounts across each element:

```ts
import { animate, stagger } from "motion"

animate(element, { backgroundColor: "red" }, { delay: stagger(0.1) })
```

### `endDelay`

Default: 0

A duration, in seconds, that the animation will wait at the end before ending.

```ts
animate(element, { backgroundColor: "red" }, { endDelay: 0.5, repeat: 2 })
```

### `easing`

Default: "ease"

An easing to use for the whole animation, or list of easings to use between individual keyframes.

Accepted easing options are:

Basic easings: "linear", "ease", "ease-in", "ease-in-out"

Cubic bezier curve: e.g. [.17,.67,.83,.67]

Stepped easing: e.g. "steps(2, start)"

Custom easing: A JavaScript easing function, for example this bounce easing function.

You can provide a single easing for the whole animation:

```ts
animate("li", { transform: "rotate(90deg)" }, { easing: "steps(2, start)" })
```

Or an array to specifically ease between individual keyframes:

```ts
animate(element, { scale: [0, 1, 2] }, { easing: ["ease-in", "ease-out"] })
```

Note on custom easing: Custom easing support for WAAPI animations is based on the new linear() easing function.

If a browser doesn't yet support linear() and the value being animated is not an independent transform (x, scale etc), Motion One will fallback to "ease".

### `direction`

Default: "normal"

The direction of animation playback. "normal", "reverse", "alternate", or "alternate-reverse".

```ts
animate(element, { transform: "rotate(90deg)" }, { direction: "reverse" })
```

### repe`at

Default: 0

The number of times the animation should repeat. Set to Infinity to repeat indefinitely.

```ts
animate(element, { transform: "rotate(90deg)" }, { repeat: Infinity })
```

### `allowWebkitAcceleration`

Default: false

Because of numerous timing bugs in Webkit's accelerated animations, these are disabled by default in Webkit-powered browsers.

However, if the your animation is being disrupted by heavy processing, you can allow acceleration with this setting. It's advised you test these animations thoroughly in both Safari and iOS Chrome.

```ts
animate(element, { transform: "scale(2)" }, { allowWebkitAcceleration: true })
```

If and when Webkit's implementation improves, this option will default to true and eventually be removed.

### `autoplay`

Default: true

Whether the animation should start automatically.

```ts
animate(element, { transform: "scale(2)" }, { autoplay: false })
```

## Returns

`timeline()` returns [AnimationControls](https://motion.dev/docs/animate#controls).
