import {
  pointerDown,
  pointerUp,
  pointerEnter,
  pointerLeave,
  render,
} from "../../../../jest.setup"
import "../../dom/__tests__/web-animations.min-edited"
import * as React from "react"
import { animated } from "../index"

console.error = jest.fn()

const duration = 0.001

describe("Poses", () => {
  test("Components will animate from initial -> style on mount", async () => {
    const promise = new Promise((resolve, reject) => {
      const onComplete = () => {
        expect(getByTestId("parent")).toHaveStyle("opacity: 1")
        expect(getByTestId("child")).toHaveStyle("transform: scale(2)")
        expect(getByTestId("grandchild")).toHaveStyle("transform: scale(0.5)")

        resolve(true)
      }

      const Component = () => (
        <animated.div
          initial="hidden"
          style="visible"
          poses={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          options={{ duration }}
          onComplete={() => onComplete()}
          data-testid="parent"
        >
          <animated.div
            poses={{
              hidden: { transform: "none" },
              visible: { transform: "scale(2)" },
            }}
            options={{ duration }}
            data-testid="child"
          >
            <animated.div
              data-testid="grandchild"
              poses={{
                hidden: { transform: "none" },
                visible: { transform: "scale(0.5)" },
              }}
              options={{ duration }}
            />
          </animated.div>
        </animated.div>
      )
      const { rerender, getByTestId } = render(<Component />)
      rerender(<Component />)

      setTimeout(() => reject(false), 100)
    })

    return expect(promise).resolves.toEqual(true)
  })

  test("Poses accept options", async () => {
    const promise = new Promise((resolve, reject) => {
      const onComplete = () => {
        expect(getByTestId("parent")).toHaveStyle("opacity: 1")
        expect(getByTestId("child")).toHaveStyle("transform: scale(2)")
        expect(getByTestId("grandchild")).toHaveStyle("transform: scale(0.5)")

        resolve(true)
      }

      const Component = () => (
        <animated.div
          initial="hidden"
          style="visible"
          poses={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, options: { duration } },
          }}
          options={{ duration: 100 }}
          onComplete={() => onComplete()}
          data-testid="parent"
        >
          <animated.div
            poses={{
              hidden: { transform: "none" },
              visible: { transform: "scale(2)", options: { duration } },
            }}
            options={{ duration: 100 }}
            data-testid="child"
          >
            <animated.div
              data-testid="grandchild"
              poses={{
                hidden: { transform: "none" },
                visible: { transform: "scale(0.5)", options: { duration } },
              }}
              options={{ duration: 100 }}
            />
          </animated.div>
        </animated.div>
      )
      const { rerender, getByTestId } = render(<Component />)
      rerender(<Component />)

      setTimeout(() => reject(false), 140)
    })

    return expect(promise).resolves.toEqual(true)
  })

  test("Components will animate when the contents of the style variant changes", async () => {
    const promise = new Promise((resolve, reject) => {
      const onComplete = () => {
        expect(getByTestId("parent")).toHaveStyle("opacity: 1")
        expect(getByTestId("child")).toHaveStyle("opacity: 1")
        expect(getByTestId("grandchild")).toHaveStyle("opacity: 1")

        resolve(true)
      }

      const Component = ({ opacity }: { opacity: number }) => (
        <animated.div
          initial="a"
          style="b"
          poses={{
            a: { opacity: 0 },
            b: { opacity },
          }}
          options={{ duration }}
          onComplete={() => onComplete()}
          data-testid="parent"
        >
          <animated.div
            poses={{
              a: { opacity: 0.5 },
              b: { opacity },
            }}
            options={{ duration }}
            data-testid="child"
          >
            <animated.div
              data-testid="grandchild"
              poses={{
                a: { opacity: 0.75 },
                b: { opacity },
              }}
              options={{ duration }}
            />
          </animated.div>
        </animated.div>
      )
      const { rerender, getByTestId } = render(<Component opacity={0.5} />)
      rerender(<Component opacity={1} />)
      rerender(<Component opacity={1} />)

      setTimeout(() => reject(false), 100)
    })

    return expect(promise).resolves.toEqual(true)
  })

  test("Components will animate when the name of the style variant changes", async () => {
    const promise = new Promise((resolve, reject) => {
      const onComplete = () => {
        expect(getByTestId("parent")).toHaveStyle("opacity: 0.5")
        expect(getByTestId("child")).toHaveStyle("opacity: 1")
        expect(getByTestId("grandchild")).toHaveStyle("transform: scale(0.5)")

        resolve(true)
      }

      const Component = ({ style }: { style: string }) => (
        <animated.div
          initial="a"
          style={style}
          poses={{
            a: { opacity: 0 },
            b: { opacity: 1 },
            c: { opacity: 0.5 },
          }}
          options={{ duration }}
          onComplete={() => onComplete()}
          data-testid="parent"
        >
          <animated.div
            poses={{
              a: { opacity: 0.5 },
              b: { opacity: 0.75 },
              c: { opacity: 1 },
            }}
            options={{ duration }}
            data-testid="child"
          >
            <animated.div
              data-testid="grandchild"
              poses={{
                b: { transform: "none" },
                c: { transform: "scale(0.5)" },
              }}
              options={{ duration }}
            />
          </animated.div>
        </animated.div>
      )
      const { rerender, getByTestId } = render(<Component style="b" />)
      rerender(<Component style="c" />)
      rerender(<Component style="c" />)

      setTimeout(() => reject(false), 50)
    })

    return expect(promise).resolves.toEqual(true)
  })

  test("Components will animate to hover variant when hover starts", async () => {
    const promise = new Promise((resolve, reject) => {
      const onComplete = () => {
        expect(getByTestId("parent")).toHaveStyle("opacity: 0.5")
        expect(getByTestId("child")).toHaveStyle("opacity: 1")
        expect(getByTestId("grandchild")).toHaveStyle("transform: scale(0.5)")

        resolve(true)
      }

      const Component = () => (
        <animated.div
          initial="a"
          style="b"
          hover="c"
          poses={{
            a: { opacity: 0 },
            b: { opacity: 1 },
            c: { opacity: 0.5 },
          }}
          options={{ duration }}
          onComplete={() => onComplete()}
          data-testid="parent"
        >
          <animated.div
            poses={{
              a: { opacity: 0.5 },
              b: { opacity: 0.75 },
              c: { opacity: 1 },
            }}
            options={{ duration }}
            data-testid="child"
          >
            <animated.div
              data-testid="grandchild"
              poses={{
                b: { transform: "none" },
                c: { transform: "scale(0.5)" },
              }}
              options={{ duration }}
            />
          </animated.div>
        </animated.div>
      )
      const { rerender, getByTestId } = render(<Component />)
      rerender(<Component />)
      pointerEnter(getByTestId("parent") as Element)

      setTimeout(() => reject(false), 50)
    })

    return expect(promise).resolves.toEqual(true)
  })

  test("Components will animate from hover variant when hover end", async () => {
    const promise = new Promise((resolve, reject) => {
      const onComplete = () => {
        expect(getByTestId("parent")).toHaveStyle(
          "opacity: 1; transform: scale(1)"
        )
        expect(getByTestId("child")).toHaveStyle("opacity: 0.75")
        expect(getByTestId("grandchild")).toHaveStyle("transform: none")

        resolve(true)
      }

      const Component = () => (
        <animated.div
          initial="a"
          style="b"
          hover="c"
          poses={{
            a: { opacity: 0, transform: "scale(1)" },
            b: { opacity: 1 },
            c: { opacity: 0.5, transform: "scale(2)" },
          }}
          options={{ duration }}
          onComplete={() => onComplete()}
          data-testid="parent"
        >
          <animated.div
            poses={{
              a: { opacity: 0.5 },
              b: { opacity: 0.75 },
              c: { opacity: 1 },
            }}
            options={{ duration }}
            data-testid="child"
          >
            <animated.div
              data-testid="grandchild"
              poses={{
                b: { transform: "none" },
                c: { transform: "scale(0.5)" },
              }}
              options={{ duration }}
            />
          </animated.div>
        </animated.div>
      )
      const { rerender, getByTestId } = render(<Component />)
      rerender(<Component />)
      pointerEnter(getByTestId("parent") as Element)
      pointerLeave(getByTestId("parent") as Element)

      setTimeout(() => reject(false), 100)
    })

    return expect(promise).resolves.toEqual(true)
  })

  test("Components will animate to press variant when press starts", async () => {
    const promise = new Promise((resolve, reject) => {
      const onComplete = () => {
        expect(getByTestId("parent")).toHaveStyle("opacity: 0.5")
        expect(getByTestId("child")).toHaveStyle("opacity: 1")
        expect(getByTestId("grandchild")).toHaveStyle("transform: scale(0.5)")

        resolve(true)
      }

      const Component = () => (
        <animated.div
          initial="a"
          style="b"
          press="c"
          poses={{
            a: { opacity: 0 },
            b: { opacity: 1 },
            c: { opacity: 0.5 },
          }}
          options={{ duration }}
          onComplete={() => onComplete()}
          data-testid="parent"
        >
          <animated.div
            poses={{
              a: { opacity: 0.5 },
              b: { opacity: 0.75 },
              c: { opacity: 1 },
            }}
            options={{ duration }}
            data-testid="child"
          >
            <animated.div
              data-testid="grandchild"
              poses={{
                b: { transform: "none" },
                c: { transform: "scale(0.5)" },
              }}
              options={{ duration }}
            />
          </animated.div>
        </animated.div>
      )
      const { rerender, getByTestId } = render(<Component />)
      rerender(<Component />)
      pointerDown(getByTestId("parent") as Element)

      setTimeout(() => reject(false), 100)
    })

    return expect(promise).resolves.toEqual(true)
  })

  test("Components will animate from press variant when press end", async () => {
    const promise = new Promise((resolve, reject) => {
      const onComplete = () => {
        expect(getByTestId("parent")).toHaveStyle(
          "opacity: 1; transform: scale(1)"
        )
        expect(getByTestId("child")).toHaveStyle("opacity: 0.75")
        expect(getByTestId("grandchild")).toHaveStyle("transform: none")

        resolve(true)
      }

      const Component = () => (
        <animated.div
          initial="a"
          style="b"
          press="c"
          poses={{
            a: { opacity: 0, transform: "scale(1)" },
            b: { opacity: 1 },
            c: { opacity: 0.5, transform: "scale(2)" },
          }}
          options={{ duration }}
          onComplete={() => onComplete()}
          data-testid="parent"
        >
          <animated.div
            poses={{
              a: { opacity: 0.5 },
              b: { opacity: 0.75 },
              c: { opacity: 1 },
            }}
            options={{ duration }}
            data-testid="child"
          >
            <animated.div
              data-testid="grandchild"
              poses={{
                b: { transform: "none" },
                c: { transform: "scale(0.5)" },
              }}
              options={{ duration }}
            />
          </animated.div>
        </animated.div>
      )
      const { rerender, getByTestId } = render(<Component />)
      rerender(<Component />)
      pointerDown(getByTestId("parent") as Element)
      pointerUp(getByTestId("parent") as Element)

      setTimeout(() => reject(false), 50)
    })

    return expect(promise).resolves.toEqual(true)
  })
})
