import { component$, Slot, $ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"

import Header from "~/components/starter/header/header"
import Footer from "~/components/starter/footer/footer"
import { Motion } from "@motionone/qwik"

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  }
})

export default component$(() => {
  return <Slot />
  return (
    <div class="page">
      <main>
        <Header />
        <Slot />
      </main>
      <div class="section dark">
        <div class="container">
          <Footer />
        </div>
      </div>
    </div>
  )
})
