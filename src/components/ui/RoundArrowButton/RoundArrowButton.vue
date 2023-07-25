<template>
  <button :style="cssVars" :disabled="disabled" class="round-arrow-button" @click="$emit('click')">
    <span v-if="text" class="round-arrow-button__text">
      {{ $t(text) }}
    </span>
    <div class="round-arrow-button__icon">
      <arrowRigth
        :class="{
          down: arrow === 'down',
          left: arrow === 'left',
          up: arrow === 'up'
        }"
      />
    </div>
  </button>
</template>

<script lang="ts">
import arrowRigth from '@/assets/icons/ui/arrow-rigth.svg'
import { computed } from 'vue'

export default {
  name: 'RoundArrowButton',
  components: { arrowRigth },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: String
    },
    bgColor: {
      type: String,
      default: '#6A4BFF'
    },
    iconFill: {
      type: String,
      default: 'white'
    },
    hoverBgColor: {
      type: String,
      default: '#1A53F0'
    },
    textColor: {
      type: String,
      default: '#0A2778'
    },
    hoverIconFill: {
      type: String,
      default: 'white'
    },
    hoverTextColor: {
      type: String,
      default: '#1A53F0'
    },
    text: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props) {
    const cssVars = computed(() => ({
      '--backgroundColor': props.bgColor,
      '--iconFillColor': props.iconFill,
      '--hoverIconFillColor': props.hoverIconFill,
      '--hoverBgColor': props.hoverBgColor,
      '--textColor': props.textColor,
      '--hoverTextColor': props.hoverTextColor
    }))

    return { cssVars }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
