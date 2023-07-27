<template>
  <teleport to="body">
    <div
      v-if="showTooltip"
      id="tooltip"
      class="tooltip"
      :style="{
        top: `${tooltipY}px`,
        left: `${tooltipX}px`,
        maxWidth: `${maxWidth}px`
      }"
      @mouseover="tooltipSelfOn"
      @mouseout="tooltipOff"
      @click.stop
    >
      <slot name="content" />
      {{ text }}
      <div class="tooltip__arrow"></div>
    </div>
  </teleport>

  <div
    class="tooltip__target"
    @mouseover="tooltipOn($event)"
    @mouseout="tooltipOff"
    ref="tooltipTargetRef"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

const props = defineProps<{ text: string; maxWidth?: number }>()

const showTooltip = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipTargetRef = ref<HTMLElement | null>(null)

const tooltipSelfOn = () => (showTooltip.value = true)
const tooltipOn = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target?.className === 'tooltip__target') {
    return
  }
  showTooltip.value = true

  nextTick(() => {
    const tooltip = document.getElementById('tooltip') as HTMLElement
    const { left, top, width, height } = target.getBoundingClientRect()

    // Calculate the viewport dimensions
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight

    // Calculate the tooltip position with adjustments to stay within the visible area
    tooltipX.value = Math.min(
      viewportWidth - tooltip.offsetWidth,
      Math.max(0, left - (tooltip.offsetWidth - width) / 2)
    )
    tooltipY.value = Math.min(
      viewportHeight - tooltip.offsetHeight,
      Math.max(0, top - tooltip.offsetHeight - height / 2)
    )
  })
}
const tooltipOff = () => {
  showTooltip.value = false
}

onMounted(() => {
  // Create a synthetic MouseEvent to pass to tooltipOn
  const syntheticMouseEvent = new MouseEvent('mouseover')
  Object.defineProperty(syntheticMouseEvent, 'target', {
    value: tooltipTargetRef.value,
    writable: false
  })
  tooltipOn(syntheticMouseEvent)
})
</script>

<style lang="scss" scoped>
.tooltip {
  background: $white;
  box-shadow: 0 4px 25px rgba(63, 54, 137, 0.25);
  border-radius: 6px;
  padding: 11px;
  position: absolute;
  z-index: 1001;
  top: 22px;
  transition: 0s;
  color: $mid-blue;
  max-width: 350px;
  word-wrap: break-word;
  &__arrow {
    height: 0px;
    width: 0px;
    position: absolute;
    border-right: solid 16px transparent;
    border-left: solid 16px transparent;
    border-top: solid 16px $white;
    margin: 3px 0 0 -9px;
  }

  &__target {
    display: inline-flex;
    align-items: center;
    //margin-left: 5px;
    cursor: pointer;

    & svg {
      top: 1px;
    }
  }
}
</style>
