# Motion R&D Division 1

A concept animation library for the web. The primary design goals are:

1. Minimize bundlesize - currently **0.75kb** but I'm budgeting for around 3 (vs Anime.js @ 7 and Greensock @ 25).
2. Improve [WebAnimations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) DX
3. Subvert WAAPI's technical limitations (springs, individual transforms etc) by re-evaluating trade-offs.

[Learn more](https://github.com/motiondivision/motion/discussions/1)

## Discussion

As a sponsor, your feedback and thoughts will be crucial to helping guide the development of the API. [Join the discussion!](https://github.com/motiondivision/motion/discussions)

## Documentation

Rich docs will be going up at [motion.dev](https://motion.dev) in due course.

## Install

```bash
npm install motion@alpha
```

**Note:** The API is still subject to discussion and as such I recommend locking to a specific version number for now.

## API

### `animate`

Animate an element to a specific target.

```javascript
animate(element, target, options)
```

`target` is currently an object containing valid CSS styles. Support for multiple keyframes is coming soon, but I'd like to first ensure the current code is thoroughly tested.

#### Options

##### `duration`

**Default:** `0.3`

A duration, in seconds, that the animation will be delayed before starting.

##### `delay`

**Default:** `0`

A duration, in seconds, that the animation will be delayed before starting.

##### `endDelay`

**Default:** `0`

A duration, in seconds, that the animation will wait at the end before repeating or ending.

##### `easing`

**Default:** `"ease"`

An easing function to use.

- Basic function names: `"linear"`, `"ease"`, `"ease-in"`, `"ease-out"`, `"ease-in-out"`
- [Cubic bezier curve](https://cubic-bezier.com/): e.g. `[.17,.67,.83,.67]`
- Stepped easing: e.g. `"steps(2, start)"`

##### `direction`

**Default:** `"normal"`

The direction of animation playback. `"normal"`, `"reverse"`, `"alternate"`, or `"alternate-reverse"`.

##### `repeat`

**Default:** `0`

The number of times the animation should repeat. Set to `Infinity` to repeat indefinitely.

##### `onStart`

Called when the animation starts.

##### `onCancel`

Called when the animation is cancelled by `stop` or `cancel`.

##### `onComplete`

Called when the animation is completed.

#### Returns

`animate` returns an `Animation`, with the additional method `stop`:

##### `stop`

The default behaviour of `Animation.cancel` is to end the animation and remove its currently computed styles. `stop` will stop the animation without removing its styles.
