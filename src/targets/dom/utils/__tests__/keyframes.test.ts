import { hydrateKeyframes } from "../keyframes"

describe("hydrateKeyframes", () => {
  test("It correctly hydrates null keyframes", () => {
    const element = document.createElement("div")
    element.style.opacity = "0.5"
    element.style.setProperty("--transform-x", "100")

    expect(hydrateKeyframes([0, 2], element, "opacity")).toEqual([0, 2])
    expect(hydrateKeyframes([0, null, 10], element, "opacity")).toEqual([
      0,
      0,
      10,
    ])
    expect(hydrateKeyframes([null, null, 10], element, "opacity")).toEqual([
      "0.5",
      "0.5",
      10,
    ])
    expect(
      hydrateKeyframes([null, null, 10], element, "--transform-x")
    ).toEqual(["100", "100", 10])
  })
})
