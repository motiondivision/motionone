import type { MotionKeyframes } from "../types"
import { createStyles } from "./style-object"

const camelLetterToPipeLetter = (letter: string) => `-${letter.toLowerCase()}`
const camelToPipeCase = (str: string) =>
  str.replace(/[A-Z]/g, camelLetterToPipeLetter)

export function createStyleString(target: MotionKeyframes = {}) {
  const styles = createStyles(target)
  let style = ""
  for (const key in styles) {
    style += `${key.startsWith("--") ? key : camelToPipeCase(key)}: ${
      styles[key]
    };`
  }
  return style
}
