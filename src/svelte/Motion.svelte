<script type="ts">
  import { createStyleString } from "../dom/utils/style-string"

  export let initial = undefined

  export let hover = undefined

  export let press = undefined

  export let inView = undefined

  export let style = ""

  const initialStyle = createStyleString(initial)
</script>

<div {...$$restProps} style="{style}; {initialStyle}" />
