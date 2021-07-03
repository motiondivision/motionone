# Motion for JavaScript

This is an experimental animation library. Its primary goals will be:

1. Improve WebAnimations API user experience (stagger, seconds)
2. Tiny bundle size (currently 0.55kb)
3. Leverage powerful browser interpolation (between color types, length types, different shadow amounts etc)
4. Spring animations
5. Custom easing functions
6. Run animations off-thread in most cases, reduce JS runtime in all

**Warning:** This is currently a proof-of-concept only. Not intended for use in production.

## Install

```
npm install motion@alpha
```

## Usage

```javascript
import { animate } from "motion"

const target = {
  backgroundColor: "green",
  transform: "translateX(100px)",
}

const options = { duration: 0.4, stagger: 0.2 }

animate("div", target, options)
```

## API

```typescript
animate(
  selector: Element | Element[] | NodeList | string,
  target: Keyframe | Keyframes[],
  options: AnimationOptions
)
```

### Options

#### `duration`

`number`: In seconds. Defaults to `0.3`.

How long the animation will play for.

#### `delay`

`number`: In seconds. Defaults to `0`.

Delay the start of the animation by this duration.

```javascript
animate("div", [{ scale: 0.5 }, { scale: 1.2 }], { delay: 1 })
```

#### `easing`

`string | number[]`: Currently either a string defining a [DOM easing function](https://www.w3.org/TR/css-easing-1/#easing-functions) or an array of numbers to define a cubic bezier curve.

#### `stagger`

`number`: In seconds. Defaults to `0`.

If animating multiple elements, add this duration to each `delay`.

#### `repeat`

`number`: Defaults to `0`.

Number of times to repeat the animation. Can be defined as `Infinity`.

#### `initialProgress`

`number`: In `0`-`1` progress. Defaults to `0`.

How far through the animation to start.

## Discussion

One of the great benefits of WebAnimations API (WAAPI) is the ability to run animations off the main thread. But while this is **a** great benefit, there are others.

For instance, the ability to animate between different color types has been absent from all my animation libraries due to the filesize cost of conversion functions. For the same reason, [Popmotion's](https://popmotion.io) ability to interpolate between complex strings is much stricter than the browsers, for instance limiting you to interpolating between shadow lists of the same length.

[Framer Motion](https://framer.com/motion) has the ability to animate properties like `width` and `translateX` between different value types. But in addition to a filesize cost, this has a runtime cost as we need to measure the DOM in order to turn all measurements into pixels.

We get all this for free in WAAPI.

On the contrary, the WAAPI is often non-intuitive. For example, its default behaviour is that a completed animation leaves an element in the state it was in **before** the animation started. Likewise common use-cases like stagger are left to userland.

I think there's already value in a simple wrapper API that can smooth over its rough edges. However as the API has hard limitations that I've always considered show-stoppers, I've never bothered, but now I wonder if there's a way out of all of these:

### Individual transforms

The best-performing animation props are `opacity` and `transform`. But `transform` is really a collection of many props, so in all my animation libraries I've made it possible to animate them with shorthand syntax and animate them separately:

```jsx
<motion.div animate={{ x: 100, scaleX: 2 }} />
```

Until now this has been impossible with WAAPI. The spec binds itself tightly to the limitations of CSS and this doesn't allow for the individual setting of values.

But recently the [CSS Properties and Values API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API/guide) offers us a way out. This would allow us to register individual transforms as CSS variables and animate those instead.

Animating these values individually would lose us the ability to animate them between unit types, but would gain us the ability to offer default unit types.

```javascript
// 👍 x could default to "px"
animate("div", [{ x: 10 }, { x: 100 }])

// 👎 Unit type interpolation on individual transforms
animate("div", [{ x: "10%" }, { x: 100 }])

// 👍 Different unit types with full transform string
animate("div", [{ transform: "translateX(10%)" }, { x: "translateX(100px)" }])
```

This would have to be a little ways down the road as Firefox and Safari have been slow to implement.

### Custom easing and spring animations

WAAPI offers the easing functions it offers and nothing more. The most bizarre limitation of the upcoming AnimationWorklet is that this doesn't offer a way around this either, without some weird hacks.

But as I thought about the remaining benefits of WAAPI once you remove the off-thread animations, I realised that these weird hacks are transportable to the synchronous world too, so we can introduce spring animations and custom easing today.

The idea is that you provide the defined animation headroom and then animate its `currentTime` using Popmotion.

```javascript
import { animate } from "popmotion"

// WAAPI
const animation = element.animate(
  [
    {},
    // This is your real target
    { backgroundColor: "red", transform: "translateX(100px)" },
    // This is your headroom
    { backgroundColor: "red", transform: `translateX(${100 * 2}px)` },
  ],
  {
    // This is double your desired animation duration
    duration: 2000,
  }
)

// We'll do the rest, thanks v.much
animation.pause()

// Animate using a Popmotion spring animation or custom easing
animate({
  to: 1000,
  elapsed: -1000,
  type: "spring",
  ...options,
  onUpdate: (v) => (animation.currentTime = v),
})
```

Using the smallest parts of Popmotion to provide synchronous time-based and spring animations would probably only amount to a ~3kb overall bundlesize.

As there'd only be a single spring animation powering all the animating values it'd be a much cheaper runtime than normal spring animations, in addition to all the benefits of browser interpolation.

## TODO

- [] Spring animations
- [] Multiple keyframe support in React
- [] Exit animations support in React
