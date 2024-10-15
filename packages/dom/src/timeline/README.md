# `timeline`

Create complex sequences of animations across multiple elements.

```ts
import { timeline } from "motion"

timeline(sequence, options)
```

## Sequence

The timeline sequence is an array:

```ts
const sequence = []
```

This array accepts animate definitions:

```ts
const sequence = [["nav", { x: 100 }, { duration: 1 }]]
```

By default, each animation will play in sequence, one after the other:

```ts
const sequence = [
  ["nav", { x: 100 }, { duration: 1 }],
  ["nav li", { opacity: 1 }, { duration: 0.3, delay: stagger(0.1) }],
]
```

### `at`

The timing of each animations can be adjusted with the at option.

Pass a number to define a specific time:

```ts
const sequence = [
  ["nav", { opacity: 1 }],
  // This will start 0.5 from the start of the whole timeline:
  ["nav", { x: 100 }, { at: 0.5 }],
]
```

Pass a number as string starting with + or - to start relative to the end of the previous animation:

```ts
const sequence = [
  ["nav", { opacity: 1 }],
  // This will start 0.5 seconds after the previous animation:
  ["nav", { x: 100 }, { at: "+0.5" }],
  // This will start 0.2 seconds before the end of the previous animation:
  ["nav li", { opacity: 1 }, { at: "-0.2" }],
]
```

Or pass "<" to start at the same time as the previous animation:

```ts
const sequence = [
  ["nav", { opacity: 1 }, { duration: 1 }],
  ["nav", { x: 100 }, { duration: 1 }],
  // This will start at the same time as the x: 100 animation
  ["nav li", { opacity: 1 }, { at: "<" }],
]
```

### Labels

By passing a string in the sequence you can mark that time with a label, to later refer to it with an at:

```ts
const sequence = [
  ["nav", { opacity: 1 }, { duration: 2 }],
  "my label",

```

In the above example, "my label" will be set to the 2 second mark. Later in the sequence, you can refer to the 2 second mark in at by using this label:

```ts
;["nav li", { opacity: 1 }, { at: "my label" }]
```

Alternatively, a label can be defined absolutely or relatively by passing it as an object with its own `at` property:

```ts
const sequence = [
  ["nav", { opacity: 1 }, { duration: 2 }],
  { name: "my label", at: "-0.5" }
```

Here, "my label" will be set to the 1.5 second mark.

### Forward-filling keyframes

When defining a segment with multiple keyframes, the first keyframe will be forward-filled to the start of the animation.

So in this example, button elements will be set to opacity: 0 at the very start of the animation, and then begin animating after 0.5 seconds:

```ts
const sequence = [["button", { opacity: [0, 1] }, { at: 0.5 }]]
```

## Options

### `duration`

**Default:** Automatically calculated

A duration, in seconds, that the animation will take to complete.

```ts
timeline(sequence, { duration: 4 })
```

By default, this is automatically calculated by the provided sequence. But if provided explicitly, the whole animation will be scaled to fit this duration.

### `delay`

**Default:** 0

A duration, in seconds, that the animation will be delayed before starting.

```ts
timeline(sequence, { delay: 0.5 })
```

### `endDelay`

**Default:** 0

A duration, in seconds, that the animation will wait at the end before ending.

```ts
timeline(sequence, { endDelay: 0.5 })
```

### `direction`

**Default:** "normal"

The direction of animation playback. "normal", "reverse", "alternate", or "alternate-reverse".

```ts
timeline(sequence, { direction: "alternate", repeat: 2 })
```

### `repeat`

**Default:** 0

The number of times the animation should repeat. Set to Infinity to repeat indefinitely.

```ts
timeline(sequence, { repeat: 2 })
```

### `defaultOptions`

An object of options to use as the default options for each animation in the sequence.

```ts
timeline(sequence, {
  defaultOptions: { ease: "ease-in-out" },
})
```

## Returns

`timeline()` returns [AnimationControls](https://motion.dev/docs/animate#controls).
