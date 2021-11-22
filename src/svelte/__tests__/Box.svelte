<script>
  import { motion } from "../Motion.svelte"

  export let hover = undefined
</script>

<div data-testid="box" use:motion={{ hover }} />