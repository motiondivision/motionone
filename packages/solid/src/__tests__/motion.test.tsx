import { createRoot, createSignal } from "solid-js"
import { screen, render, fireEvent } from "solid-testing-library"
import { motion } from "../motion"

const duration = 0.001

describe("motion", () => {
  test("Renders element as proxy Motion.Tag to HTML", async () => {
    await render(() => <motion.span data-testid="box"></motion.span>)
    const component = await screen.findByTestId("box")
    expect(component.tagName).toEqual(`SPAN`)
  })
  test("renders children to HTML", async () => {
    await render(() => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        data-testid="box"
      >
        <motion.a href="foo" />
        <motion.svg viewBox="0 0 1 1" />
      </motion.div>
    ))
    const component = await screen.findByTestId("box")
    expect(component.innerHTML).toEqual(
      `<a href="foo"></a><svg viewBox="0 0 1 1"></svg>`
    )
  })

  test("Applies initial as style to DOM node", async () => {
    await render(() => (
      <motion.div
        data-testid="box"
        initial={{ opacity: 0.5, x: 100 }}
      ></motion.div>
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
    const element = await new Promise((resolve, reject) => {
      const Component = () => {
        let ref!: HTMLDivElement
        return (
          <motion.div
            ref={ref}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0, 0.8] }}
            onMotionComplete={() => resolve(ref)}
            transition={{ duration }}
          />
        )
      }
      render(Component)
      setTimeout(() => reject(false), 200)
    })
    expect(element).toHaveStyle("opacity: 0.8")
  })

  test("Animation doesn't run on mount if initial and animate are the same", async () => {
    const element = await new Promise((resolve, reject) => {
      const Component = () => {
        const animate = { opacity: 0.4 }
        return (
          <motion.div
            initial={animate}
            animate={animate}
            onMotionComplete={() => reject(false)}
            transition={{ duration }}
          />
        )
      }
      render(Component)
      setTimeout(() => resolve(true), 200)
    })
    expect(element).toBe(true)
  })

  test("Animation runs when target changes", async () => {
    const result = await new Promise((resolve) =>
      createRoot((dispose) => {
        const Component = (props: any) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={props.animate}
              onMotionComplete={({ detail }) => {
                if (detail.target.opacity === 0.8) resolve(true)
              }}
              transition={{ duration }}
            />
          )
        }
        const [animate, setAnimate] = createSignal({ opacity: 0.5 })
        render(() => <Component animate={animate()} />)
        setAnimate({ opacity: 0.8 })
        setTimeout(dispose, 20)
      })
    )
    expect(result).toBe(true)
  })

  test("Accepts default transition", async () => {
    const element = await new Promise<HTMLElement>((resolve) => {
      let ref!: HTMLDivElement
      render(() => (
        <motion.div
          ref={ref}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 10 }}
        />
      ))
      setTimeout(() => resolve(ref), 500)
    })
    expect(element.style.opacity).not.toEqual("0.9")
  })

  test("animate default transition", async () => {
    const element = await new Promise<HTMLElement>((resolve) => {
      let ref!: HTMLDivElement
      render(() => (
        <motion.div
          ref={ref}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.9, transition: { duration: 10 } }}
        />
      ))
      setTimeout(() => resolve(ref), 500)
    })
    expect(element.style.opacity).not.toEqual("0.9")
  })

  test("Passes event handlers", async () => {
    const captured: any[] = []
    const element = await new Promise<HTMLElement>((resolve) => {
      let ref!: HTMLDivElement
      render(() => (
        <motion.div
          ref={ref}
          hover={{ scale: 2 }}
          onHoverStart={() => captured.push(0)}
        />
      ))
      setTimeout(() => resolve(ref), 1)
    })
    fireEvent.pointerEnter(element)
    expect(captured).toEqual([0])
  })
})
