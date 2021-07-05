import { getTargetKeyframe } from "../keyframes"

describe("getTargetKeyframe", () => {
  test("Get target keyframe from array of keyframes", () => {
    expect(getTargetKeyframe({ x: 1 })).toEqual({ x: 1 })
    expect(getTargetKeyframe([{ x: 1 }])).toEqual({ x: 1 })
    // TODO This should return a keyframe with opacity included
    expect(getTargetKeyframe([{ opacity: 1 }, { x: 1 }])).toEqual({ x: 1 })
  })
})
