# Changelog

Motion One adheres to [Semantic Versioning](http://semver.org/).

## [10.15.5] [2023-01-11]

### Added

- Adding checks for present `Element` and `keyframes`.

## [10.15.4] [2022-12-18]

### Fixed

- Updating `solid`.

## [10.15.3] [2022-12-06]

### Fixed

- Fixed `process` in UMD package.

## [10.15.2] [2022-12-06]

### Fixed

- Fixed imports in UMD package.

## [10.15.1] [2022-12-06]

### Added

- UMD package for `@motionone/dom`.

## [10.15.0] [2022-12-05]

### Fixed

- Add options `persist: true` to leave an animation running when complete.

## [10.14.3] [2022-10-31]

### Fixed

- Fixed type of argument for `createAnimate`.

## [10.14.2] [2022-09-07]

### Fixed

- Fixed exit animations in Solid 1.5.

## [10.14.1] [2022-08-23]

### Added

- `createAnimate` export for creating `animate()` without the `Animation` polyfill. This is not a public API.

## [10.14.0] [2022-08-17]

### Added

- Support for animating transforms as unit values.

## [10.13.3] [2022-08-12]

### Fixed

- Fixing `InViewOptions` within Motion One for Solid.

## [10.13.2] [2022-08-05]

### Fixed

- Making `BezierDefinition` `readonly`.

## [10.13.1] [2022-07-18]

### Added

- Keyframes and `timeline` now support custom easing functions.

## [10.13.0] [2022-07-18]

### Added

- `animate` now support custom easing functions.

### Removed

- `motion/react` entry point.

## [10.12.0] [2022-07-10]

### Added

- `scroll` function for tracking scroll events and powering scroll-driven animations.

### Fixed

- Fixing `play` -> `cancel` behaviour in Safari. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/102)

## [10.11.2] [2022-07-06]

### Removed

- Removing default `root` in `inView` as this [silently fails in iOS Safari 14-15](https://bugs.webkit.org/show_bug.cgi?id=224324).

## [10.11.1] [2022-07-06]

### Added

- In supported browsers, `inView` will use `document` as the default value for `root` to ensure `rootMargin` works within iframes.

## [10.11.0] [2022-06-24]

### Added

- `inView` function for detecting when elements enter and leave the viewport.
- Adding `view` options prop to Motion One for Vue and Solid.

## [10.10.2] [2022-06-24]

### Fixed

- Gracefully failing when no elements are found. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/95)

## [10.10.1] [2022-06-24]

### Fixed

- Fixed incorrect handling of `easing` string vs array in polyfill. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/96)

## [10.10.0] [2022-05-28]

### Added

- Added support for [timeline labels](https://motion.dev/dom/timeline#labels). These allow you to to reference parts of the timeline using a name rather than a timestamp.

## [10.9.0] [2022-05-23]

### Added

- Adding support for `playState` prop.

## [10.8.3] [2022-05-23]

### Fixed

- Fixing reflection of playback controls so unsupported props aren't executed as functions.

## [10.8.2] [2022-05-16]

### Fixed

- Exporting `@motionone/types` types via `motion`. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/78)

## [10.8.1] [2022-04-29]

### Fixed

- Fixing types for `stagger` `delay` option.

## [10.8.0] [2022-04-28]

### Added

- [Motion One for Solid](https://motion.dev/solid/quick-start).

### Fixed

- Remove `repeat` and `direction` from `timeline` segment options. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/67)
- Converting all transform values into numbers before forwarding to animation polyfill. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/68)
- Fixed `initial="false"` typechecking in Motion One for Vue.

## [10.7.2] [2022-04-16]

### Fixed

- Fixing forced read of initial keyframe when Motion DevTools is recording if keyframe is explicitly defined.

## [10.7.1] [2022-04-11]

### Fixed

- Fixed `stagger` calculations with easings.

## [10.7.0] [2022-03-20]

### Added

- Added support for Motion Developer Tools.

## [10.6.2] [2022-02-08]

### Fixed

- Fixed velocity calculations of critically and overdamped animations.

## [10.6.1] [2022-02-06]

### Fixed

- Fixed velocity transfer of interrupted generated animations. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/43)

## [10.6.0] [2022-01-22]

### Added

- Custom animations by passing function to `animate`.

## [10.5.2] [2022-01-16]

### Fixed

- Fixing types for `Presence`. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/44)

## [10.5.1] [2022-01-15]

### Fixed

- Fixing "default slot" warning in Vue `Presence` component. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/45)

## [10.5.0] [2022-01-01]

### Added

- **Motion One for Vue:** A fully declarative version of Motion One for Vue 3!
- `style` utility for getting/setting styles and CSS variables on DOM elements.

## [10.4.0] [2021-10-18]

### Added

- **Spring and glide in timeline:** `timeline` now supports animations with `ease: spring()` and `ease: glide()`.

## [10.3.2] [2021-10-18]

### Fixed

- Fixing animation interruption for independent transform animations in Safari and Firefox. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/27)

## [10.3.1] [2021-10-12]

### Fixed

- Fixing a bug in `stagger` and `animate`.

## [10.3.0] [2021-10-11]

### New

- **Glide:** Animate transforms with realistic [glide](https://motion.dev/dom/glide) that can be used to mimic momentum scroll.

### Fixed

- Fixing a bug where sometimes velocity wasn't being correctly passed to the next animation.

## [10.2.1] [2021-10-06]

### Fixed

- Ensuring `duration` is always passed correctly to the independent transform polyfill.

## [10.2.0] [2021-10-05]

### New

- **Springs:** Animate transforms with realistic [spring](https://motion.dev/dom/spring) simulations.

## [10.1.3] [2021-10-01]

### Fixed

- **Fill both for timelines:** Extends `fill: "both"` effect from `10.1.2` to `timeline`.

## [10.1.2] [2021-10-01]

### Fixed

- **Fill both:** Previously, if an animation had a delay and an initially-defined first keyframe (`opacity: [0, 1]`) the animation would start from its rendered style to that first keyframe. Now, the initial keyframe gets stretched to the very start of the whole animation by setting `fill: "both"`. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/20)

## [10.1.1] [2021-09-28]

### Fixed

- **Scrub to end:** Setting `currentTime` to `duration` was removing the animation effect. This has been fixed by setting `fill: "forwards"` on the WAAPI animation. This won't affect memory consumption as animations are flattened into styles and removed on finish. [Issue (sponsors only)](https://github.com/motiondivision/motionone/issues/21)

### Changed

- **Removed Popmotion dependency:** Reduced the number of dependencies by moving Popmotion utilities inside Motion One. Filesize remains unaffected in most environments but will be lower in Skypack and other distributors that don't support tree-shaking.

## [10.1.0] [2021-09-27]

### New

- **Duration:** The duration of timelines is usually automatically calculated from its defined animations. It can now be read from the new read-only `duration` prop on [animation controls](http://motion.dev/dom/controls).

### Changed

- **Performance:** Before Motion One starts a new animation, it stops the old one. Stopping an animation commits its styles, which can cause a style recalculation. Now, when an animation finishes, we delete the reference to the old animation. Additionally, we check the animation status isn't `"finished"` before committing styles within `stop`. This prevents unnecessary style recalculations.

## [10.0.3] [2021-09-25]

### Fixed

- Fixed formatting of changelog for website publication.

## [10.0.2] [2021-09-24]

### Changed

- Generating `finished` promise on-demand.

### Fixed

- Catching promise in `animate` and `timeline` to prevent errors whenever a sub-animation is cancelled.

## [10.0.1] [2021-09-22]

### Changed

- Removed links to repo from Readme.

## [10.0.0] [2021-09-12]

### New

- First publish
