import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { animated } from ".."

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
      <animated.div initial={{ "--foo": 0 }} style={{ "--bar": 1 }} />
    )
    expect(div).toBe(`<div style="--foo:0;--bar:1"></div>`)
  })

  test("Renders expected transform", () => {
    const div = render(<animated.div initial={{ x: 100 }} />)
    expect(div).toBe(
      `<div style="--motion-translateX:100px;transform:translateX(var(--motion-translateX))"></div>`
    )
  })
}

describe("render", () => {
  runTests(renderToString)
})

describe("renderToStaticMarkup", () => {
  runTests(renderToStaticMarkup)
})
