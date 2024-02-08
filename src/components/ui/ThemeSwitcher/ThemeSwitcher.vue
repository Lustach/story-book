<template>
  <div class="theme-switcher" @click="toggleDarkMode">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      :stroke="mode === 'dark' ? 'currentColor' : ''"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :style="{ ...svgContainerProps, cursor: 'pointer' }"
    >
      <mask id="mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle :style="maskedCircleProps" cx="12" cy="4" r="9" fill="black" />
      </mask>
      <circle :style="centerCircleProps" fill="black" cx="12" cy="12" r="9" :mask="`url(#mask)`" />

      <g :style="linesProps" fill="currentColor">
        <line
          v-for="(line, index) in linesForSun"
          :key="index"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :style="{ stroke: mode === 'dark' ? 'currentColor' : 'black' }"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { ref, computed } from 'vue'
const isDarkMode = ref(false)
const mode = useColorMode()
const properties = ref({
  sun: {
    r: 9,
    transform: 'rotate(40deg)',
    cx: 12,
    cy: 4,
    opacity: 0
  },
  moon: {
    r: 5,
    transform: 'rotate(90deg)',
    cx: 30,
    cy: 0,
    opacity: 1
  },
  springConfig: { mass: 4, tension: 150, friction: 35 }
})
const linesForSun = ref([
  { x1: 12, y1: 1, x2: 12, y2: 3 },
  { x1: 12, y1: 21, x2: 12, y2: 23 },
  { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 },
  { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 },
  { x1: 1, y1: 12, x2: 3, y2: 12 },
  { x1: 21, y1: 12, x2: 23, y2: 12 },
  { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 },
  { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 }
])
const circleProps = computed(() => {
  return mode.value === 'dark' ? properties.value.moon : properties.value.sun
})
const svgContainerProps = computed(() => {
  return {
    transform: circleProps.value.transform,
    config: properties.value.springConfig
  }
})
const centerCircleProps = computed(() => {
  return {
    r: circleProps.value.r,
    config: properties.value.springConfig
  }
})
const maskedCircleProps = computed(() => {
  return {
    cx: circleProps.value.cx,
    cy: circleProps.value.cy,
    config: properties.value.springConfig
  }
})
const linesProps = computed(() => {
  return {
    opacity: circleProps.value.opacity,
    config: properties.value.springConfig
  }
})
const toggleDarkMode = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>
<style>
.theme-switcher {
}

.theme-switcher g line {
  transition: stroke 0.5s ease;
}
</style>
