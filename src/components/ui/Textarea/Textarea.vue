<template>
  <div class="textarea">
    <label :for="id" :style="{ width: labelWidth }">{{ label }} </label>
    <textarea
      ref="textareaRef"
      :id="id"
      :value="value"
      :placeholder="!hasFocus ? placeholder : ''"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :data-qa="dataQa"
      @focus="onFocus"
      @blur="onBlur"
      @input="inputHandler"
    />
    <keep-alive v-if="icon">
      <component :is="currentIcon" class="textarea__icon" />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { fixCrlf } from '@/utils/inputHandler'

const props = defineProps<{
  label?: string
  value: string
  id: string
  icon?: string
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
  dataQa?: string | null
}>()

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

const hasFocus = ref(false)
const currentIcon = ref()
const textareaRef = ref<HTMLElement | null>(null)
const labelWidth = ref('100%')

const inputHandler = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target && target.value) {
    emit('update:value', fixCrlf(target.value))
  }
}

const onFocus = () => {
  hasFocus.value = true
}

const onBlur = () => {
  hasFocus.value = false
}
useResize()
function useResize() {
  let resizeObserver: ResizeObserver
  onMounted(() => {
    if (textareaRef.value) {
      resizeObserver = new ResizeObserver(() => {
        if (textareaRef.value) {
          labelWidth.value = `${textareaRef.value.clientWidth}px`
        }
      })

      resizeObserver.observe(textareaRef.value)
    }
  })

  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    }
  })

  watchEffect(() => {
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.textarea {
  height: 100%;
  display: flex;
  position: relative;

  & label {
    font-size: 14px;
    line-height: 17px;
    color: $mid-gray;
    position: absolute;
    font-family: 'Panton_SemiBold';
    z-index: 1;
    background: white;
    left: 1px;
    padding-left: 15px;
    top: 1px;
    padding-top: 12px;
    border-radius: 8px;
  }

  & textarea {
    @include input;
    transition: border-color ease-in-out 0.7s;
    outline: none;
    padding: 31px 10px 10px 34px;
    &:focus {
      border: 1px solid $blue;
    }
    &:disabled {
      background: $too-ligth-gray;
    }
  }

  &__icon {
    left: 17px;
    top: 34px;
  }
}
</style>
