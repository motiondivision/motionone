import { mountedStates } from "@motionone/dom"
import { createRoot, createSignal, Show } from "solid-js"
import { screen, render } from "solid-testing-library"
import { Presence, Motion, VariantDefinition } from ".."

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

  test("All children have their state unmounted", () =>
    createRoot(async () => {
      const [show, setShow] = createSignal(true)
      render(() => (
        <Presence>
          <Show when={show()}>
            <Motion.div
              data-testid="child1"
              exit={{ opacity: 0, transition: { duration: 0.001 } }}
            >
              <Motion data-testid="child2"></Motion>
            </Motion.div>
          </Show>
        </Presence>
      ))
      const child1 = await screen.findByTestId("child1")
      const child2 = await screen.findByTestId("child2")

      setShow(false)

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(mountedStates.get(child1)).toBeUndefined()
          expect(mountedStates.get(child2)).toBeUndefined()
          resolve()
        }, 100)
      })
    }))
})
