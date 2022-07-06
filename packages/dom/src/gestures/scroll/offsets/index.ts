import { defaultOffset, interpolate } from "@motionone/utils"
import { ScrollInfo } from "../types"
import { calcInset } from "./inset"
import { ScrollOffset } from "./presets"
import { ScrollOptions } from "../types"
import { resolveOffset } from "./offset"

const point = { x: 0, y: 0 }

export function resolveOffsets(
  container: HTMLElement,
  info: ScrollInfo,
  options: ScrollOptions
) {
  let { offset: offsetDefinition = ScrollOffset.All } = options
  const { target = container, axis = "y" } = options
  const lengthLabel = axis === "y" ? "height" : "width"

  const inset = target !== container ? calcInset(target, container) : point

  /**
   * Measure the target and container. If they're the same thing then we
   * use the container's scrollWidth/Height as the target, from there
   * all other calculations can remain the same.
   */
  const targetSize =
    target === container
      ? { width: container.scrollWidth, height: container.scrollHeight }
      : { width: target.clientWidth, height: target.clientHeight }

  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight,
  }

  /**
   * Reset the length of the resolved offset array rather than creating a new one.
   * TODO: More reusable data structures for targetSize/containerSize would also be good.
   */
  info[axis].offset.length = 0

  /**
   * Populate the offset array by resolving the user's offset definition into
   * a list of pixel scroll offets.
   */
  const numOffsets = offsetDefinition.length
  for (let i = 0; i < numOffsets; i++) {
    info[axis].offset[i] = resolveOffset(
      offsetDefinition[i],
      containerSize[lengthLabel],
      targetSize[lengthLabel],
      inset[axis]
    )
  }

  /**
   * If the pixel scroll offsets have changed, create a new interpolator function
   * to map scroll value into a progress.
   *
   * TODO: Only create a new interpolator if offsets have changed
   */
  info[axis].progress = interpolate(
    defaultOffset(numOffsets),
    info[axis].offset
  )(info[axis].current)
}
