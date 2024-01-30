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
      @click.stop=""
    >
      <slot name="content" />
      {{ text }}
      <div class="tooltip__arrow"></div>
    </div>
  </teleport>

  <div class="tooltip__target" @mouseover="tooltipOn" @mouseout="tooltipOff" ref="tooltipTargetRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, defineProps } from 'vue'

const props = defineProps<{ text: string; maxWidth?: number }>()

const showTooltip = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipTargetRef = ref<HTMLElement | null>(null)

const tooltipSelfOn = () => (showTooltip.value = true)
const tooltipOn = (event: MouseEvent) => {
  const offsetTop: number = 10
  if (showTooltip.value) return
  const target = event.target as HTMLElement
  if (target?.className === 'tooltip__target') {
    return
  }
  showTooltip.value = true

  nextTick(() => {
    const tooltip = document.getElementById('tooltip') as HTMLElement
    const targetRect = tooltipTargetRef.value!.getBoundingClientRect()

    tooltipX.value = targetRect.left + window.scrollX
    tooltipY.value = targetRect.top + window.scrollY - tooltip.offsetHeight - offsetTop
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
