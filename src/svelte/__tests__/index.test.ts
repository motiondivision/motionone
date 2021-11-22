import { render } from "@testing-library/svelte"
import Box from "./Box.svelte"

describe("motion", () => {
  test("Render", () => {
    const { getByTestId } = render(Box)
    expect(getByTestId("box")).toBeTruthy()
  })

  test("Accepts hover", async () => {
    const { getByTestId } = render(Box, { hover: { scale: 1.2 } })
    expect(getByTestId("box")).toBeTruthy()
  })
})
