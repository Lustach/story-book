<template>
  <InlineSvg :src="require(`@/svg/${name}.svg`)" class="fill-current" />
</template>

<script lang="ts">
import InlineSvg from 'vite-svg-loader'

export default {
  components: { InlineSvg },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
