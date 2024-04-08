<template>
  <div>
    <h1>ProgressBar</h1>
    <Progressbar :config="config" :curStep="curStep" />
  </div>
</template>
<script lang="ts" setup>
import Progressbar from '@/components/ui/Progressbar/Progressbar.vue'
const config = [2, 5, 3, 8, 1]
// const curStep = {
//   index: 0,
//   part: 1
// }
const curStep = {
  index: 3,
  part: 3
}
</script>
<style lang="scss"></style>
