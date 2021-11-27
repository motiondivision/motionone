import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { animated } from ".."

/**
 * TODO:
 * - When first is null, style shouldn't be hydrated
 */

function runTests(render: any) {
  test("Doesn't throw", () => {
    render(
      <animated.div
        initial={{ opacity: 0, x: 100, "--color": "#fff", "--number": 0 }}
        style={{ opacity: 0, x: 100, "--color": "#fff", "--number": 0 }}
        hover={{ opacity: 0, x: 100, "--color": "#fff", "--number": 0 }}
        press={{ opacity: 0, x: 100, "--color": "#fff", "--number": 0 }}
        onStart={() => {}}
        onComplete={() => {}}
      />
    )
    expect(true).toBe(true)
  })

  test("Renders expected markup from style", () => {
    const div = render(<animated.div style={{ opacity: 1 }} />)
    expect(div).toBe(`<div style="opacity:1"></div>`)
  })

  test("Renders expected markup from style as keyframes", () => {
    const div = render(<animated.div style={{ opacity: [0, 1] }} />)
    expect(div).toBe(`<div style="opacity:0"></div>`)
  })

  test("Renders expected markup from initial", () => {
    const div = render(<animated.div initial={{ opacity: 0 }} />)
    expect(div).toBe(`<div style="opacity:0"></div>`)
  })

  test("Renders expected CSS variables", () => {
    const div = render(
      <animated.div
        initial={{ "--foo": 0, "--bar": 2 }}
        style={{ "--bar": 1, "--car": 3 }}
      />
    )
    expect(div).toBe(`<div style="--bar:2;--car:3;--foo:0"></div>`)
  })

  test("Renders expected transform", () => {
    const div = render(<animated.div initial={{ x: 100 }} />)
    expect(div).toBe(
      `<div style="--motion-translateX:100px;transform:translateX(var(--motion-translateX))"></div>`
    )
  })

  test("Filters out all props", () => {
    const div = render(
      <animated.div
        hover={{ opacity: 1 }}
        press={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        inViewport={{ opacity: 1 }}
        inherit={false}
        poses={{}}
        viewport={{ margin: "100px" }}
        options={{ duration: 1 }}
        onStart={() => {}}
        onComplete={() => {}}
        onViewportEnter={() => {}}
        onViewportLeave={() => {}}
      />
    )

    expect(div).toBe("<div></div>")
  })

  test("Renders initial and style as poses", () => {
    const html = render(
      <animated.div
        initial="foo"
        style="bar"
        hover="litmus"
        press="litmus"
        inViewport="litmus"
        exit="litmus"
        poses={{
          foo: { opacity: 1, background: "red" },
          bar: { opacity: 0.5, width: "100px" },
          litmus: { opacity: 0.75 },
        }}
      >
        <animated.article
          style={{ opacity: 1 }}
          poses={{ foo: { opacity: 0.99 }, litmus: { background: "red" } }}
        >
          <animated.span poses={{ bar: { opacity: 0.25 } }}>
            <animated.div poses={{ foo: { opacity: 0.2 } }}>
              <animated.div
                inherit={false}
                poses={{ foo: { opacity: 0.3 } }}
              ></animated.div>
            </animated.div>
          </animated.span>
        </animated.article>
      </animated.div>
    )
    expect(html).toBe(
      `<div style="opacity:1;width:100px;background:red"><article style="opacity:0.99"><span><div style="opacity:0.2"><div></div></div></span></article></div>`
    )
  })
}

describe("render", () => {
  runTests(renderToString)
})

describe("renderToStaticMarkup", () => {
  runTests(renderToStaticMarkup)
})
