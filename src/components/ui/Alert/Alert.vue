<template>
  <div class="alert-container" :class="[type, position]" v-show="model">
    <Tooltip v-if="tooltipText" :text="tooltipText">
      <IconInfo class="alert-icon" />
    </Tooltip>
    <p class="alert-title">
      {{ title }}
    </p>
    <IconClose class="alert-close" @click="close" />
  </div>
</template>
<script setup lang="ts">
import IconClose from '@/assets/icons/ui/close-icon.svg'
import IconInfo from '@/assets/icons/ui/info.svg'

import Tooltip from '@/components/ui/Tooltip/Tooltip.vue'

type Props = {
  title: string
  type: 'info' | 'warning' | 'danger' | 'success'
  position: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'
  tooltipText: string
}
defineProps<Props>()
const model = defineModel<boolean>({ default: true })
const emits = defineEmits(['close'])
const close = () => {
  model.value = false
  emits('close')
}
</script>
<style lang="scss" scoped>
@mixin position($top, $left) {
  position: fixed;
  top: $top;
  left: $left;
}
@mixin alert($background, $text, $fill) {
  background: $background;
  color: $text;
  svg {
    fill: $fill;
  }
}
$color-info: #a5c8ff;
$color-success: #e1f9f2;
$color-warning: #d26d2b;
$color-danger: #ca2647;

.alert {
  &-container {
    width: 364px;
    height: 56px;
    padding: 16px 12px;
    font-size: 16px;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 1;
    p {
      width: 100%;
    }
    border-radius: 8px;
    svg {
      width: 16px;
    }
  }
  &-title {
  }
  &-icon {
    margin-right: 12px;
  }
  &-close {
    margin-left: 8px;
    cursor: pointer;
  }
}
.top-left {
  @include position(12px, 12px);
}

.bottom-left {
  @include position(calc(100% - 68px), 12px);
}

.top-right {
  @include position(12px, calc(100% - 376px));
}

.bottom-right {
  @include position(calc(100% - 68px), calc(100% - 376px));
}

.info {
  @include alert($color-info, #307dfb, #307dfb);
}

.success {
  @include alert($color-success, #146354, #146354);
}

.warning {
  @include alert($color-warning, #fff, #fff);
}

.danger {
  @include alert($color-danger, #fff, #fff);
}
</style>
