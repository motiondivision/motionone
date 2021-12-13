import "@testing-library/jest-dom"
import "config/waapi-polyfill"
import { mount } from "@vue/test-utils"
import Motion from "../Motion"

describe("Motion", () => {
  test("Renders element", async () => {
    const wrapper = mount(Motion, {
      props: { "data-testid": "box" },
    })
    expect(wrapper.get("[data-testid='box']").element).toBeTruthy()
  })

  test("Renders element as 'as' prop", async () => {
    const wrapper = mount(Motion, {
      props: { "data-testid": "box", as: "li" },
    })
    expect(wrapper.get("[data-testid='box']").element.tagName).toEqual("LI")
  })

  test("Applies initial as style", async () => {
    const wrapper = mount(Motion, {
      props: { "data-testid": "box", initial: { opacity: 0.5, x: 100 } },
    })

    expect(wrapper.get("[data-testid='box']").element).toHaveStyle({
      opacity: 0.5,
      transform: "translateX(var(--motion-translateX))",
      "--motion-translateX": "100px",
    })
  })
})
