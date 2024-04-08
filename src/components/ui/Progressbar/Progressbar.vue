<template>
  <div class="progressbar_container">
    <template v-for="(item, i) in config.length + 1" :key="i">
      <div class="dot"></div>
      <div class="bar" v-if="i < config.length">
        <div
          class="bar-part"
          v-for="(part, j) in config[i]"
          :key="j"
          :style="{
            backgroundColor: setParts(i, j) ? '#000' : ''
          }"
        ></div>
      </div>
    </template>
    {{ config }}
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
type Props = {
  config: number[]
  curStep: {
    index: number
    part: number
  }
}

const props = defineProps<Props>()
const setParts = (i: number, j: number) => {
  const curStep = props.curStep
  return i < curStep.index || (i <= curStep.index && j < curStep.part) ? '#000' : ''
}
</script>
<style scoped lang="scss">
.progressbar_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.bar {
  width: 100%;
  max-width: 106px;
  height: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  &-part {
    background-color: grey;
    height: 100%;
    width: 100%;
  }
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: pink;
}
</style>
