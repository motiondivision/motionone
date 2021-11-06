import { fireEvent } from "@testing-library/dom"
import { pose } from ".."
import {
  pointerDown,
  pointerEnter,
  pointerLeave,
} from "../../../../../jest.setup"
import "../../__tests__/web-animations.min-edited.js"

/**
 * TODO:
 *  - Press only on single finger
 */

describe("press", () => {
  test("Animate to press when press starts", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      pose(
        element,
        {
          pressed: { scale: 0.5 },
          press: "pressed",
        },
        { duration: 0.01 }
      )

      element.addEventListener("posecomplete", resolve)

      pointerDown(element)
    })

    expect(element).toHaveStyle("--motion-scale: 0.5")
  })

  test("Press fires pressstart event when press is triggered", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      element.addEventListener("pressstart", resolve)
      pose(element, { press: { opacity: 1 } })
      pointerDown(element)
    })
  })

  test("Press fires pressend event when press is triggered", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      element.addEventListener("pressend", resolve)
      pose(element, { press: { opacity: 1 } })
      pointerDown(element)
      fireEvent.pointerUp(window)
    })
  })

  test("Animate to new press pose while press is active", async () => {
    const element = document.createElement("div")

    await new Promise((resolve) => {
      pose(element, { press: { opacity: 0.5 } }, { duration: 0.01 })

      pointerDown(element)

      requestAnimationFrame(() => {
        pose(element, { press: { opacity: 0.75 } }, { duration: 0.01 })
        element.addEventListener("posecomplete", resolve)
      })
    })

    expect(element).toHaveStyle("opacity: 0.75")
  })

  test("If hover changes while overridden by press, don't animate", async () => {
    const element = document.createElement("div")

    await new Promise<void>((resolve) => {
      pose(
        element,
        {
          hover: { opacity: 0.5 },
          press: { opacity: 0.75 },
        },
        { duration: 0.01 }
      )

      pointerEnter(element)

      requestAnimationFrame(() => {
        pointerDown(element)
        pose(
          element,
          {
            hover: { opacity: 0.25 },
            press: { opacity: 0.75 },
          },
          { duration: 0.01 }
        )

        setTimeout(() => {
          resolve()
        }, 50)
      })
    })

    expect(element).toHaveStyle("opacity: 0.75")
  })

  test("Animate from press to hover when press ends", async () => {
    const element = document.createElement("div")
    element.style.opacity = "1"

    await new Promise<void>((resolve) => {
      pose(
        element,
        {
          hover: { opacity: 0.5 },
          press: { opacity: 0.75 },
        },
        { duration: 0.01 }
      )

      pointerEnter(element)

      requestAnimationFrame(() => {
        pointerDown(element)

        setTimeout(() => {
          fireEvent.pointerUp(window)
          setTimeout(() => {
            resolve()
          }, 50)
        }, 10)
      })
    })

    expect(element).toHaveStyle("opacity: 0.5")
  })

  test("Animate from press to style when press ends and hover is inactive", async () => {
    const element = document.createElement("div")
    element.style.opacity = "1"

    await new Promise<void>((resolve) => {
      pose(
        element,
        {
          hover: { opacity: 0.5 },
          press: { opacity: 0.75 },
        },
        { duration: 0.01 }
      )

      pointerEnter(element)

      requestAnimationFrame(() => {
        pointerDown(element)

        setTimeout(() => {
          pointerLeave(element)
          fireEvent.pointerUp(window)

          setTimeout(() => {
            resolve()
          }, 50)
        }, 10)
      })
    })

    expect(element).toHaveStyle("opacity: 1")
  })
})
