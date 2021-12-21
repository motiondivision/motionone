import "@testing-library/jest-dom"
import "config/waapi-polyfill"
import { mount } from "@vue/test-utils"
import { Motion } from "../Motion"

/**
 * Features TODO/test
 *
 *  - Animate when value changes
 *  - Presence
 *  - Renders child element
 *  - Hover
 *  - Press
 *  - Event handlers
 *
 *  - Variants
 *  - inView
 */

describe("Motion", () => {
  test("Renders element", async () => {
    const wrapper = mount(Motion, {
      props: { "data-testid": "box" },
    })
    expect(wrapper.get("[data-testid='box']").element).toBeTruthy()
  })

  test("Renders element as 'as' prop to HTML", async () => {
    const wrapper = mount(Motion, {
      props: { "data-testid": "box", as: "li" },
    })
    expect(wrapper.html()).toEqual(`<li data-testid="box"></li>`)
  })

  test("Renders element as 'as' prop to DOM node", async () => {
    const wrapper = mount(Motion, {
      props: { "data-testid": "box", as: "li" },
    })
    expect(wrapper.get("[data-testid='box']").element.tagName).toEqual("LI")
  })

  test("Applies initial as style to HTML", async () => {
    const wrapper = mount(Motion, {
      props: { "data-testid": "box", initial: { opacity: 0.5, x: 100 } },
    })

    expect(wrapper.html()).toEqual(
      `<div style="opacity: 0.5; --motion-translateX: 100px; transform: translateX(var(--motion-translateX));" data-testid="box"></div>`
    )
  })

  test("Applies initial as style to DOM node", async () => {
    const wrapper = mount(Motion, {
      props: { "data-testid": "box", initial: { opacity: 0.5, x: 100 } },
    })

    expect(wrapper.get("[data-testid='box']").attributes("style")).toEqual(
      "opacity: 0.5; --motion-translateX: 100px; transform: translateX(var(--motion-translateX));"
    )
  })

  test("Animates on mount", async () => {
    const wrapper = mount(Motion, {
      props: {
        "data-testid": "box",
        initial: { opacity: 0.5 },
        animate: { opacity: 0.9 },
      },
    })

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
        expect(wrapper.get("[data-testid='box']").attributes("style")).toEqual(
          "opacity: 0.9;"
        )
      }, 500)
    })
  })

  test("Accepts default transition", async () => {
    const wrapper = mount(Motion, {
      props: {
        "data-testid": "box",
        initial: { opacity: 0.5 },
        animate: { opacity: 0.9 },
        transition: { duration: 10 },
      },
    })

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
        expect(
          wrapper.get("[data-testid='box']").attributes("style")
        ).not.toEqual("opacity: 0.9;")
      }, 500)
    })
  })

  test("animate accepts transition", async () => {
    const wrapper = mount(Motion, {
      props: {
        "data-testid": "box",
        initial: { opacity: 0.5 },
        animate: { opacity: 0.9, transition: { duration: 10 } },
      },
    })

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
        expect(
          wrapper.get("[data-testid='box']").attributes("style")
        ).not.toEqual("opacity: 0.9;")
      }, 500)
    })
  })
})
