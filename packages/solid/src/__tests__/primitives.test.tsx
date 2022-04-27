import { createRoot, createSignal, Show } from "solid-js"
import { screen, render } from "solid-testing-library"
import { Presence, VariantDefinition, motion } from ".."
motion

const duration = 0.001

describe("motion directive", () => {
  test("Applies initial as style to DOM node", async () => {
    await render(() => (
      <div
        data-testid="box"
        use:motion={{
          initial: { opacity: 0.5, x: 100 },
        }}
      />
    ))
    const component = await screen.findByTestId("box")
    expect(component.style.opacity).toBe("0.5")
    expect(component.style.getPropertyValue("--motion-translateX")).toBe(
      "100px"
    )
    expect(component.style.transform).toBe(
      "translateX(var(--motion-translateX))"
    )
  })

  test("Animation runs on mount if initial and animate differ", async () => {
    const element = await new Promise((resolve) => {
      const Component = () => {
        let ref!: HTMLDivElement
        setTimeout(() => resolve(ref), 50)
        return (
          <div
            ref={ref}
            use:motion={{
              initial: { opacity: 0.4 },
              animate: { opacity: [0, 0.8] },
              transition: { duration },
            }}
          />
        )
      }
      render(Component)
    })
    expect(element).toHaveStyle("opacity: 0.8")
  })

  test("Animation runs when target changes", async () => {
    await createRoot(async (dispose) => {
      const [animate, setAnimate] = createSignal({ opacity: 0.5 })

      const element = await new Promise((resolve) => {
        const Component = (props: any) => {
          let ref!: HTMLDivElement
          setTimeout(() => resolve(ref), 100)
          return (
            <div
              ref={ref}
              use:motion={{
                initial: { opacity: 0 },
                animate: props.animate,
                transition: { duration },
              }}
            />
          )
        }
        render(() => <Component animate={animate()} />)
      })
      expect(element).toHaveStyle("opacity: 0.5")

      await new Promise<void>((resolve) => {
        setAnimate({ opacity: 0.8 })
        setTimeout(() => {
          expect(element).toHaveStyle("opacity: 0.8")
          dispose()
          resolve()
        }, 100)
      })
    })
  })

  test("Accepts default transition", async () => {
    const element = await new Promise<HTMLElement>((resolve) => {
      let ref!: HTMLDivElement
      render(() => (
        <div
          ref={ref}
          use:motion={{
            initial: { opacity: 0.5 },
            animate: { opacity: 0.9 },
            transition: { duration: 10 },
          }}
        />
      ))
      setTimeout(() => resolve(ref), 500)
    })
    expect(element.style.opacity).not.toEqual("0.9")
  })

  describe("with Presence", () => {
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
            <div
              data-testid="child"
              use:motion={{
                animate: props.animate,
                exit: props.exit,
              }}
            />
          </Show>
        </Presence>
      )
    }

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
  })
})
