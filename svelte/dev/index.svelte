<script type="ts">
  import Motion from "../../src/svelte/Motion.svelte"

  let isOpen = true

  const onClick = () => {
    console.log("test")((isOpen = false))
  }
</script>

{#if isOpen}
  <Motion
    initial={{ width: "100px", height: "100px", background: "red", opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    on:click={onClick}
  >
    <Motion
      style="width: 100px; height: 100px; background-color: white; margin: 10px;"
      variants={{ hidden: { opacity: 0.5 } }}
    />
    <Motion
      style="width: 100px; height: 100px; background-color: white; margin: 10px;"
      variants={{ hidden: { opacity: 0.5 } }}
    />
    <div style="width: 50px;height:50px;background-color:black" />
  </Motion>
{/if}
