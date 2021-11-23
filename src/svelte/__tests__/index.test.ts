// TODO: Move this line to setupAfterEnv in jest config
import "@testing-library/jest-dom"
import { render } from "@testing-library/svelte"
import Motion from "../Motion.svelte"
import TestParentWithChild from "./TestParentWithChild.svelte"

function renderBox(props: any) {
  const { getByTestId } = render(Motion, { "data-testid": "box", ...props })
  return getByTestId("box")
}

describe("Motion", () => {
  test("Render", () => {
    expect(renderBox({})).toBeTruthy()
  })

  test("Renders initial as style", async () => {
    const box = renderBox({
      initial: { scale: 1.2, color: "green" },
    })

    expect(box).toHaveStyle(
      "color: green; transform: scale(var(--motion-scale)); --motion-scale: 1.2"
    )
  })

  test("Child renders inherited initial", async () => {
    const { getByTestId } = render(TestParentWithChild, {
      parentProps: {
        initial: "hidden",
        variants: {
          hidden: { opacity: 0, backgroundColor: "red" },
        },
      },
      childProps: {
        variants: {
          hidden: { y: 100, backgroundColor: "purple" },
        },
      },
    })

    expect(getByTestId("parent")).toHaveStyle("background-color: red;")
    expect(getByTestId("child")).toHaveStyle("background-color: purple;")
    expect(getByTestId("child")).toHaveStyle(
      "transform: translateY(var(--motion-translateY))"
    )
    expect(getByTestId("parent")).toHaveStyle("opacity: 0")
  })

  test("Updates style when props change", async () => {})
})
