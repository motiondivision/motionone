import { render } from "@testing-library/svelte"
import Motion from "../Motion.svelte"

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

  test("Rerenders style", async () => {
    const { getByTestId, rerender } = render(Motion, {
      "data-testid": "box",
      style: "background-color: red",
    })
    rerender({ "data-testid": "box", style: "background-color: green" })
    expect(getByTestId("box")).toHaveStyle("background-color: green; ")
  })
})
