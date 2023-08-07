import { mountedStates } from "@motionone/dom"
import { children, createRoot, createSignal, Show } from "solid-js"
import { screen, render } from "solid-testing-library"
import { Presence, Motion, VariantDefinition } from ".."
import type { RefProps } from "@solid-primitives/refs"

const TestComponent = (
  props: {
    initial?: boolean
    show?: boolean
    animate?: VariantDefinition
    exit?: VariantDefinition
  } = {}
) => {
  return (
    <Presence initial={props.initial ?? true}>
      <Show when={props.show ?? true}>
        <Motion.div
          data-testid="child"
          animate={props.animate}
          exit={props.exit}
        />
      </Show>
    </Presence>
  )
}

describe("Presence", () => {
  test("Renders element", async () => {
    render(TestComponent)
    const component = await screen.findByTestId("child")
    expect(component).toBeTruthy()
  })

  test("On initial Presence render, initial: false applies to children", () => {
    const wrapper = render(() => (
      <TestComponent show initial={false} animate={{ opacity: 0.5 }} />
    ))
    expect(wrapper.container.outerHTML).toEqual(
      `<div><div style="opacity: 0.5;" data-testid="child"></div></div>`
    )
  })

  test("Animates element out", () =>
    createRoot(async () => {
      const [show, setShow] = createSignal(true)
      render(() => (
        <TestComponent
          show={show()}
          exit={{ opacity: 0, transition: { duration: 0.001 } }}
        />
      ))
      const component = await screen.findByTestId("child")
      expect(component.style.opacity).toBe("")
      expect(component.isConnected).toBeTruthy()

      setShow(false)

      expect(component.style.opacity).toBe("")
      expect(component.isConnected).toBeTruthy()

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(component.style.opacity).toBe("0")
          expect(component.isConnected).toBeFalsy()
          resolve()
        }, 100)
      })
    }))

  test("All children run their exit animation", async () => {
    const [show, setShow] = createSignal(true)

    let ref_1!: HTMLDivElement, ref_2!: HTMLDivElement
    let resolve_1: () => void, resolve_2: () => void

    const exit_animation: VariantDefinition = {
      opacity: 0,
      transition: { duration: 0.001 },
    }

    const rendered = createRoot(() =>
      children(() => (
        <Presence>
          <Show when={show()}>
            <Motion
              ref={ref_1}
              exit={exit_animation}
              onMotionComplete={() => resolve_1()}
            >
              <Motion
                ref={ref_2}
                exit={exit_animation}
                onMotionComplete={() => resolve_2()}
              />
            </Motion>
          </Show>
        </Presence>
      ))
    )

    expect(rendered()).toContain(ref_1)
    expect(ref_1).toContainElement(ref_2)
    expect(ref_1.style.opacity).toBe("")
    expect(ref_2.style.opacity).toBe("")
    expect(mountedStates.has(ref_1)).toBeTruthy()
    expect(mountedStates.has(ref_2)).toBeTruthy()

    setShow(false)

    expect(rendered()).toContain(ref_1)
    expect(ref_1.style.opacity).toBe("")
    expect(ref_2.style.opacity).toBe("")

    await new Promise<void>((resolve) => {
      let count = 0
      resolve_1 = resolve_2 = () => {
        if (++count === 2) resolve()
      }
    })

    expect(rendered()).toHaveLength(0)
    expect(ref_1.style.opacity).toBe("0")
    expect(ref_2.style.opacity).toBe("0")
    expect(mountedStates.has(ref_1)).toBeFalsy()
    expect(mountedStates.has(ref_2)).toBeFalsy()
  })

  test("exitBeforeEnter delays enter animation until exit animation is complete", async () => {
    const [condition, setCondition] = createSignal(true)

    let ref_1!: HTMLDivElement, ref_2!: HTMLDivElement
    let resolve_last: (() => void) | undefined

    const El = (props: RefProps<HTMLDivElement>) => (
      <Motion.div
        ref={props.ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.001 }}
        onMotionComplete={() => resolve_last?.()}
      />
    )

    const rendered = createRoot(() =>
      children(() => (
        <Presence exitBeforeEnter>
          <Show
            when={condition()}
            children={<El ref={ref_1} />}
            fallback={<El ref={ref_2} />}
          />
        </Presence>
      ))
    )

    expect(rendered()).toContain(ref_1)
    expect(ref_1.style.opacity).toBe("0")

    // enter 1
    await new Promise<void>((resolve) => (resolve_last = resolve))

    expect(rendered()).toContain(ref_1)
    expect(ref_1.style.opacity).toBe("1")

    setCondition(false)

    expect(rendered()).toContain(ref_1)
    expect(rendered()).not.toContain(ref_2)
    expect(ref_1.style.opacity).toBe("1")
    expect(ref_2.style.opacity).toBe("0")

    // exit 1
    await new Promise<void>((resolve) => (resolve_last = resolve))

    expect(rendered()).toContain(ref_2)
    expect(rendered()).not.toContain(ref_1)
    expect(ref_1.style.opacity).toBe("0")
    expect(ref_2.style.opacity).toBe("0")

    // enter 2
    await new Promise<void>((resolve) => (resolve_last = resolve))

    expect(rendered()).toContain(ref_2)
    expect(rendered()).not.toContain(ref_1)
    expect(ref_1.style.opacity).toBe("0")
    expect(ref_2.style.opacity).toBe("1")
  })
})
