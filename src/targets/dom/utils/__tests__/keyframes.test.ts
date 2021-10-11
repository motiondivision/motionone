import { hydrateKeyframes } from "../keyframes"

describe("hydrateKeyframes", () => {
  test("It correctly hydrates null keyframes", () => {
    expect(hydrateKeyframes([0, 2], () => 0)).toEqual([0, 2])
    expect(hydrateKeyframes([0, null, 10], () => 0)).toEqual([0, 0, 10])
    expect(hydrateKeyframes([null, null, 10], () => "0.5")).toEqual([
      "0.5",
      "0.5",
      10,
    ])
    expect(hydrateKeyframes([null, null, 10], () => "100")).toEqual([
      "100",
      "100",
      10,
    ])
  })
})
