<script type="ts">
  import Motion from "../../src/svelte/Motion.svelte"
</script>

<Motion
  style="width: 300px; height: 300px; background-color: #0055ff"
  initial="hidden"
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
