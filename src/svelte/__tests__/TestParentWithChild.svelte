<script type="ts">
  import Motion from "../Motion.svelte"

  export let parentProps: any = undefined
  export let childProps: any = undefined
</script>

<Motion data-testid="parent" {...parentProps}>
  <Motion data-testid="child" {...childProps} />
</Motion>
