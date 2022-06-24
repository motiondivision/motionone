// TODO: Move this line to setupAfterEnv in jest config
import "@testing-library/jest-dom"
import "config/waapi-polyfill"
import { render } from "@testing-library/svelte"
import Motion from "../Motion.svelte"
import TestParentWithGrandchild from "./TestParentWithGrandchild.svelte"

const duration = 0.01

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

  test("Children render inherited initial", async () => {
    const { getByTestId } = render(TestParentWithGrandchild, {
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
      grandchildProps: {
        variants: {
          hidden: { backgroundColor: "green" },
        },
      },
    } as any)

    expect(getByTestId("parent")).toHaveStyle(
      "background-color: red; opacity: 0"
    )
    expect(getByTestId("child")).toHaveStyle(
      "background-color: purple; transform: translateY(var(--motion-translateY))"
    )
    expect(getByTestId("grandchild")).toHaveStyle("background-color: green;")
  })

  test("Animation runs on mount if initial and animate differ", async () => {
    const result = await new Promise((resolve, reject) => {
      const { getByTestId } = render(Motion, {
        "data-testid": "box",
        initial: { opacity: 0.4 },
        animate: { opacity: [0, 0.8] },
        transition: { duration },
      } as any)
      getByTestId("box").addEventListener(
        "motioncomplete",
        ({ detail }: any) => {
          resolve(detail.target)
        }
      )

      setTimeout(() => reject(false), 100)
    })

    expect(result).toEqual({ opacity: [0, 0.8] })
  })

  test("Animation doesn't run on mount if initial and animate are the same", async () => {
    const result = await new Promise((resolve, reject) => {
      const animate = { opacity: 0.4 }
      const { getByTestId } = render(Motion, {
        "data-testid": "box",
        initial: animate,
        animate,
        transition: { duration },
      } as any)
      getByTestId("box").addEventListener("motioncomplete", () => {
        reject(false)
      })

      setTimeout(() => resolve(true), 100)
    })

    expect(result).toEqual(true)
  })

  test.skip("Animation doesn't run in subsequent render if value doesn't change", async () => {
    const result = await new Promise((resolve, reject) => {
      let completeCount = 0

      const props = {
        "data-testid": "box",
        initial: { opacity: 0.4 },
        animate: { opacity: [0, 0.8] },
        transition: { duration },
      }

      const { getByTestId, rerender } = render(Motion, props as any)
      getByTestId("box").addEventListener("motioncomplete", () => {
        if (!completeCount) {
          rerender(props as any)
        } else {
          reject(false)
        }

        completeCount++
      })

      setTimeout(() => resolve(true), 200)
    })

    expect(result).toEqual(true)
  })
})
