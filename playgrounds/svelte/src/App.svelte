<script>
  import { spring } from "motion"
  import { motion, presence, layout } from "@motionone/svelte"
  import { element } from "svelte/internal"
  export let name

  let visible = true

  const toggleVisibility = () => (visible = !visible)

  const settings = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.2 },
  }

  let horizontal = false
  let next = 1
  let list = []
  const addItem = () => (list = [next++, ...list])
  const removeItem = (number) => (list = list.filter((n) => n !== number))
  const options = {}

  const layoutTransition = {
    easing: spring(),
  }
</script>

<main>
  <h1>Demos</h1>
  {#if visible}
    <div class="test" use:motion={settings} in:presence.in out:presence.out />
  {/if}
  <button on:click={toggleVisibility}>Toggle visiblility</button>
  <section>
    <label>
      Horizontal
      <input type="checkbox" bind:checked={horizontal} />
    </label>
    <button on:click={addItem}>Add</button>
    {#each list as n (n)}
      <div animate:layout={layoutTransition} class:horizontal class="container">
        <button on:click={() => removeItem(n)}>{n}</button>
      </div>
    {/each}
  </section>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .test {
    width: 100px;
    height: 100px;
    background: red;
    --motion-scale: 0.5;
    opacity: 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .container {
    width: fit-content; /* necessary for correct button sizes */
  }

  .horizontal {
    display: inline-block;
    margin-left: 10px;
  }
</style>
