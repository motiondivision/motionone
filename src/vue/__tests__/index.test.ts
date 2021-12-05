import "@testing-library/jest-dom"
import "../../dom/__tests__/web-animations.min-edited"
import { render } from "@testing-library/vue"
import Motion from "../Motion.vue"

describe("Motion", () => {
  test("Renders element", async () => {
    const { getByTestId } = render(Motion, {
      props: { "data-testid": "box" },
    })
    expect(getByTestId("box")).toBeTruthy()
  })

  test("Renders element as 'as' prop", async () => {
    const { getByTestId } = render(Motion, {
      props: { "data-testid": "box", as: "li" },
    })
    expect(getByTestId("box").tagName).toEqual("LI")
  })
})
