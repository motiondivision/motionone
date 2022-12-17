import { A } from "@solidjs/router"

export default function Home() {
  return (
    <main>
      <h1>Examples</h1>
      <ul>
        <li>
          <A href="/examples/render">Render</A>
        </li>
        <li>
          <A href="/examples/animate">Animation</A>
        </li>
        <li>
          <A href="/examples/animate-prop-change">Animation on prop change</A>
        </li>
        <li>
          <A href="/examples/events">Events</A>
        </li>
        <li>
          <A href="/examples/motion-primitive">Motion Primitive</A>
        </li>
        <li>
          <A href="/examples/presence-initial">Presence</A>
        </li>
        <li>
          <A href="/examples/presence-switch">Presence with Switch</A>
        </li>
        <li>
          <A href="/examples/presence-multiple">Presence (Multiple Nodes)</A>
        </li>
      </ul>
    </main>
  )
}
