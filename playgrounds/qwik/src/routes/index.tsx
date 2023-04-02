import { component$ } from "@builder.io/qwik"
import { DocumentHead, Link } from "@builder.io/qwik-city"

export default component$(() => {
  return (
    <main>
      <h1>Examples</h1>
      <ul>
        <li>
          <Link href="/examples/render">Render</Link>
        </li>
        <li>
          <Link href="/examples/animate">Animation</Link>
        </li>
        <li>
          <Link href="/examples/animate-prop-change">
            Animation on prop change
          </Link>
        </li>
        <li>
          <Link href="/examples/events">Events</Link>
        </li>
        {/* TODO: Uncomment and build pages when <Presence /> component is built */}
        {/* <li>
          <Link href="/examples/motion-primitive">Motion Primitive</Link>
        </li>
        <li>
          <Link href="/examples/presence-initial">Presence</Link>
        </li>
        <li>
          <Link href="/examples/presence-switch">Presence with Switch</Link>
        </li>
        <li>
          <Link href="/examples/presence-multiple">
            Presence (Multiple Nodes)
          </Link>
        </li> */}
      </ul>
    </main>
  )
})

export const head: DocumentHead = {
  title: "@motionone/qwik Playground",
  meta: [
    {
      name: "description",
      content: "Playground to demo Motion component",
    },
  ],
}
