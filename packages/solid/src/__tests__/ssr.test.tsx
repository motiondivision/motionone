import { renderToString } from "solid-js/web"
import { motion, Presence } from ".."

describe("ssr", () => {
  test("Renders", () => {
    const html = renderToString(() => <motion.div />)
    expect(html).toBe('<div data-hk="0-0-0-0-0" style="" ></div>')
  })

  test("Renders style", () => {
    const html = renderToString(() => <motion.div style={{ opacity: 1 }} />)
    expect(html).toBe(`<div data-hk="0-0-0-0-0" style="opacity:1" ></div>`)
  })

  test("Renders initial as style", () => {
    const html = renderToString(() => (
      <motion.div initial={{ scale: 1.2, opacity: 1 }} />
    ))
    expect(html).toBe(
      `<div data-hk=\"0-0-0-0-0\" style=\"--motion-scale:1.2;opacity:1;transform:scale(var(--motion-scale))\" ></div>`
    )
  })

  test("Children render inherited initial", () => {
    const html = renderToString(() => (
      <motion.div
        initial="hidden"
        variants={{ hidden: { opacity: 0, "background-color": "red" } }}
      >
        <motion.ul
          variants={{ hidden: { y: 100, "background-color": "purple" } }}
        >
          <motion.li variants={{ hidden: { "background-color": "green" } }} />
        </motion.ul>
      </motion.div>
    ))
    expect(html).toBe(
      `<div data-hk=\"0-0-0-0-0\" style=\"opacity:0;background-color:red\" ><ul data-hk=\"0-0-0-0-1-0-0-0-0\" style=\"--motion-translateY:100px;background-color:purple;transform:translateY(var(--motion-translateY))\" ><li data-hk=\"0-0-0-0-1-0-0-0-1-0-0-0-0\" style=\"background-color:green\" ></li></ul></div>`
    )
  })

  test("Renders expected markup from style as keyframes", () => {
    const div = renderToString(() => (
      <motion.div initial={{ opacity: [0, 1] }} />
    ))
    expect(div).toBe(`<div data-hk=\"0-0-0-0-0\" style=\"opacity:0\" ></div>`)
  })

  test("Renders expected CSS variables", () => {
    const div = renderToString(() => (
      <motion.div
        initial={{ "--foo": 0, "--bar": 2 }}
        style={{ "--bar": 1, "--car": 3 } as any}
      />
    ))
    expect(div).toBe(
      `<div data-hk=\"0-0-0-0-0\" style=\"--bar:2;--car:3;--foo:0\" ></div>`
    )
  })

  test("Renders expected transform", () => {
    const div = renderToString(() => <motion.div initial={{ x: 100 }} />)
    expect(div).toBe(
      `<div data-hk=\"0-0-0-0-0\" style=\"--motion-translateX:100px;transform:translateX(var(--motion-translateX))\" ></div>`
    )
  })

  test("Filters out all props", () => {
    const div = renderToString(() => (
      <motion.div hover={{ opacity: 1 }} press={{ opacity: 1 }} variants={{}} />
    ))
    expect(div).toBe('<div data-hk="0-0-0-0-0" style="" ></div>')
  })

  test("Renders Presence", () => {
    const html = renderToString(() => (
      <Presence>
        <motion.div />
      </Presence>
    ))
    expect(html).toBe('<div data-hk="0-0-0-0-0-0-0-0" style="" ></div>')
  })

  test("Renders Presence with initial styles", () => {
    const html = renderToString(() => (
      <Presence>
        <motion.div initial={{ opacity: 1 }} />
      </Presence>
    ))
    expect(html).toBe(
      '<div data-hk="0-0-0-0-0-0-0-0" style="opacity:1" ></div>'
    )
  })

  test("Renders Presence without initial styles", () => {
    const html = renderToString(() => (
      <Presence initial={false}>
        <motion.div initial={{ opacity: 1 }} />
      </Presence>
    ))
    expect(html).toBe('<div data-hk="0-0-0-0-0-0-0-0" style="" ></div>')
  })
})
