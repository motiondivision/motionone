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

  test("Accepts style", async () => {
    const box = renderBox({ style: "background-color: red" })
    expect(box).toHaveStyle("background-color: red")
  })

  test("Renders initial as style", async () => {
    const box = renderBox({
      initial: { scale: 1.2, color: "green" },
      style: "background-color: red",
    })

    expect(box).toHaveStyle(
      "background-color: red; color: green; transform: scale(var(--motion-scale)); --motion-scale: 1.2"
    )
  })

  test("Child renders inherited initial", async () => {
    const { getByTestId } = render(TestParentWithChild, {
      parentProps: {
        initial: "hidden",
        variants: {
          hidden: { opacity: 0 },
        },
      },
      childProps: {
        variants: {
          hidden: { y: 100 },
        },
      },
    })

    expect(getByTestId("parent")).toHaveStyle("opacity: 0")
    expect(getByTestId("child")).toHaveStyle("transform: translateY(100px)")
  })

  test("Updates style when props change", async () => {})
})
