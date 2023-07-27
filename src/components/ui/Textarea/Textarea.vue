<template>
  <div class="textarea">
    <label :for="id">{{ label }} </label>
    <textarea
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
import { ref } from 'vue'

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

const inputHandler = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target && target.value) {
    emit('update:value', target.value)
  }
}

const onFocus = () => {
  hasFocus.value = true
}

const onBlur = () => {
  hasFocus.value = false
}
</script>

<style lang="scss" scoped>
.textarea {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  & svg {
    position: absolute;
  }

  & label {
    font-size: 14px;
    line-height: 17px;
    color: $mid-gray;
    position: absolute;
    top: 12px;
    left: 15px;
    font-family: 'Panton_SemiBold';
  }

  & textarea {
    @include input;
    outline: none;
    resize: none;
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
