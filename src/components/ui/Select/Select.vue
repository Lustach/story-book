<template>
  <div
    class="select"
    tabindex="0"
    :data-qa="dataQa"
    @click="toggleVisibleOptions"
    @blur="closeOptions"
  >
    <div class="select__body">
      <div v-if="label" class="select__label">
        {{ label }}
      </div>
      <div class="select__value">
        <keep-alive v-if="icon">
          <component
            :is="currentIcon"
            class="select__icon"
            :class="{ 'input__icon--disabled': disabled }"
          />
        </keep-alive>

        <span class="select__value-text">{{ selected.value }}</span>

        <div
          v-if="!disabled"
          :class="`${isOptionsVisible}`"
          class="select__arrow"
          @click.stop="toggleVisibleOptions"
        >
          <arrow-down />
        </div>
      </div>
    </div>
    <transition name="slide-from-top">
      <div v-show="isOptionsVisible" class="select__options">
        <div
          v-for="(option, index) of options"
          :key="index"
          class="select__option"
          :class="{
            'select__option--selected': option[valueKey] === selected[valueKey]
          }"
          :data-qa="dataQa && `${dataQa}--${option[valueKey]}`"
          @click.stop="handleChangeValue(option[valueKey])"
        >
          {{ option.value }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import arrowDown from '@/assets/icons/ui/arrow-down.svg'

const props = withDefaults(
  defineProps<{
    label?: string
    icon?: string
    disabled: boolean
    options: { [key: string]: any }[]
    modelValue: string | number
    valueKey: string
    dataQa?: string
  }>(),
  {
    label: '',
    icon: '',
    disabled: false,
    options: () => [{}],
    modelValue: '',
    valueKey: 'prop'
  }
)
const emit = defineEmits(['update:modelValue', 'change'])

const currentIcon = ref()
const isOptionsVisible = ref(false)
const selected: { [key: string]: any } = computed(() => {
  const value = props.options.find((option) => option[props.valueKey] === props.modelValue)
  return value ? value : {}
})

// if (props.icon) {
//   import(`@/assets/icons/input/${props.icon}.svg`).then((val) => {
//     currentIcon.value = markRaw(val.default)
//   })
// }

const closeOptions = () => {
  isOptionsVisible.value = false
}

const openOptions = () => {
  isOptionsVisible.value = true
}

const toggleVisibleOptions = () => {
  if (props.disabled) {
    return
  }

  isOptionsVisible.value = !isOptionsVisible.value
}

const handleChangeValue = (val: string) => {
  if (props.disabled) {
    return
  }

  closeOptions()
  if (val === selected.value && selected.value[props.valueKey]) {
    return
  }

  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
