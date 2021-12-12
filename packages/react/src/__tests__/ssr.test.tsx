import * as React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { motion } from ".."

function runTests(render: any) {
  test("Renders", () => {
    const html = render(<motion.div />)
    expect(html).toBe("<div></div>")
  })

  test("Renders style", () => {
    const html = render(<motion.div style={{ opacity: 1 }} />)
    expect(html).toBe(`<div style="opacity:1"></div>`)
  })

  test("Renders initial as style", () => {
    const html = render(<motion.div initial={{ scale: 1.2, opacity: 1 }} />)
    expect(html).toBe(
      `<div style="--motion-scale:1.2;opacity:1;transform:scale(var(--motion-scale))"></div>`
    )
  })

  test("Children render inherited initial", () => {
    const html = render(
      <motion.div
        initial="hidden"
        variants={{ hidden: { opacity: 0, backgroundColor: "red" } }}
      >
        <motion.ul variants={{ hidden: { y: 100, backgroundColor: "purple" } }}>
          <motion.li variants={{ hidden: { backgroundColor: "green" } }} />
        </motion.ul>
      </motion.div>
    )
    expect(html).toBe(
      `<div style="opacity:0;background-color:red"><ul style="--motion-translateY:100px;background-color:purple;transform:translateY(var(--motion-translateY))"><li style="background-color:green"></li></ul></div>`
    )
  })

  test("Renders expected markup from style as keyframes", () => {
    const div = render(<motion.div initial={{ opacity: [0, 1] }} />)
    expect(div).toBe(`<div style="opacity:0"></div>`)
  })

  test("Renders expected CSS variables", () => {
    const div = render(
      <motion.div
        initial={{ "--foo": 0, "--bar": 2 }}
        style={{ "--bar": 1, "--car": 3 } as any}
      />
    )
    expect(div).toBe(`<div style="--bar:2;--car:3;--foo:0"></div>`)
  })

  test("Renders expected transform", () => {
    const div = render(<motion.div initial={{ x: 100 }} />)
    expect(div).toBe(
      `<div style="--motion-translateX:100px;transform:translateX(var(--motion-translateX))"></div>`
    )
  })

  test("Filters out all props", () => {
    const div = render(
      <motion.div
        hover={{ opacity: 1 }}
        press={{ opacity: 1 }}
        variants={{}}
        // exit={{ opacity: 1 }}
        // inViewport={{ opacity: 1 }}
        // inherit={false}
        // poses={{}}
        // viewport={{ margin: "100px" }}
        // options={{ duration: 1 }}
        // onStart={() => {}}
        // onComplete={() => {}}
        // onViewportEnter={() => {}}
        // onViewportLeave={() => {}}
      />
    )

    expect(div).toBe("<div></div>")
  })
}

describe("render", () => {
  runTests(renderToString)
})

describe("renderToStaticMarkup", () => {
  runTests(renderToStaticMarkup)
})
