# Changelog

Motion One adheres to [Semantic Versioning](http://semver.org/).

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
