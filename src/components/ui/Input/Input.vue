<template>
  <div
    class="input"
    :class="{
      empty: type === 'empty',
      noIcon: !icon,
      error,
      'input--type--currency': isTypeCurrency
    }"
  >
    <label :for="id">
      {{ label }}
      <component :is="iconInfo" v-if="labelInfo" class="input__label-info" />
    </label>
    <input
      :id="id"
      ref="inputRef"
      v-model="valueRef"
      :type="inputType"
      :placeholder="dynamicPlaceholder"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :disabled="disabled"
      spellcheck="false"
      :style="{ background }"
      :readonly="hardAutocompleteOff"
      onfocus="this.removeAttribute('readonly')"
      :data-qa="dataQa"
      @input="inputHandler"
      @focus="onFocusHandler"
      @blur="onBlurHandler"
    />
    <span v-if="type === 'number' && text" class="input__text">{{ text }}</span>
    <div v-if="error && showErrorText" class="input__error">
      <iconError />
      <span class="input__error-text">{{ error }}</span>
    </div>
    <keep-alive v-if="icon">
      <img
        :src="currentIcon"
        class="input__icon"
        :class="{ 'input__icon--disabled': disabled }"
        :data-icon="dataQa && `${dataQa}__icon`"
        @click="$emit('iconClick')"
      />
    </keep-alive>
    <div
      v-if="type === 'password'"
      :data-qa="dataQa && `${dataQa}__visible-button`"
      @click="hide = !hide"
    >
      <transition name="fade">
        <iconHide v-if="hide" class="input__visibility-icon" />
        <iconVision v-else class="input__visibility-icon" />
      </transition>
    </div>

    <transition name="fade">
      <div v-if="clearable && valueRef" class="input__clear-icon" @click="clearInput">
        <component :is="iconClose" />
      </div>
    </transition>

    <div v-if="withCopy && valueRef && type !== 'password'" class="input__copy">
      <component :is="iconCopy" :data-qa="dataQa && `${dataQa}__copy-button`" @click="copyValue" />
      <transition name="fade1">
        <span v-if="isCopied" class="input__tooltip">
          {{ $t('copiedToClipboard') }}
        </span>
      </transition>
    </div>

    <div
      v-if="showSetMax"
      class="input__max"
      :data-qa="dataQa && `${dataQa}__max-button`"
      @click="setMax"
    >
      {{ $t('max') }}
    </div>

    <span v-if="currency" class="input__currency" :style="{ left: `${currencyOffset}px` }">
      {{ currency }}
    </span>

    <!-- for get value width in px -->
    <span ref="currencyTextRef" class="input__hidden-value">{{
      valueRef || dynamicPlaceholder
    }}</span>
  </div>
</template>

<script setup lang="ts">
import iconClose from '@/components/icons/ui/close-icon-round.vue'
import iconCopy from '@/components/icons/ui/copy.vue'
import iconInfo from '@/components/icons/ui/info.vue'
import iconVision from '@/components/icons/ui/vision.vue'
import iconHide from '@/components/icons/ui/hide.vue'
import iconError from '@/components/icons/ui/error.vue'

import { computed, ref, watch, nextTick, onMounted, type Ref, markRaw } from 'vue'
import type { Props } from './props'

import { useClipboard } from '@vueuse/core'
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input', 'clear', 'iconClick'])

const valueRef = ref('')
const { copyValue, isCopied } = useCopyValue(valueRef)
function useCopyValue(modelValue: Ref<string>): { copyValue: () => void; isCopied: Ref<boolean> } {
  const { copy } = useClipboard()
  const isCopied = ref(false)
  const copyValue = () => {
    if (modelValue.value) copy(modelValue.value)
    isCopied.value = true

    setTimeout(() => {
      isCopied.value = false
    }, 1500)
  }
  return {
    copyValue,
    isCopied
  }
}

// const { currentIcon } = useImportIcon(`/src/assets/icons/ui/${props.icon}.svg`)
function useImportIcon(url: string) {
  let currentIcon = ref('')
  if (props.icon) {
    currentIcon.value = new URL(url, import.meta.url).href
  }
  return {
    currentIcon
  }
}
const { hide, inputType } = useInputType()
function useInputType() {
  const hide = ref(false)
  const inputType = computed(() => {
    if (props.type === 'password') {
      return hide.value ? 'text' : 'password'
    } else if (props.type === 'currency') {
      return 'text'
    }

    return props.type
  })
  return { hide, inputType }
}
const focusFlag = ref(false)
const isTypeCurrency = computed(() => props.type === 'currency')
const currencyOffset = ref(0)

// DOM
const currencyTextRef = ref(2134)
const inputRef = ref()
const textWidth = ref(0)
const inputPaddingLeft = ref(0)
const inputWidth = ref(0)

// when focus, placeholder = ''
const dynamicPlaceholder = computed(() => (focusFlag.value ? '' : props.placeholder))

const placeholderShown = computed(() => {
  return !focusFlag.value && !!dynamicPlaceholder.value && !valueRef.value
})

const prepareRealValue = (value: any) => {
  if (isTypeCurrency.value) {
    return (
      value
        .toString()
        // remove spaces
        .replace(/\s+/g, '')
        .replace(/[БбЮю]/, '.')
        .replace(',', '.')
        // only number
        .replace(/[^.\d]+/g, '')
        // remove extra 0 before decimal
        .replace(/^0+/, '0')
        // remove extra dots
        // eslint-disable-next-line no-useless-escape
        .replace(/^([^\.]*\.)|\./g, '$1')
    )
  }

  return value
}

const prepareModelValue = (value: string) => {
  if (isTypeCurrency.value) {
    return value.replace(/\.$/gm, '')
  }

  return value
}

const setCurrencyOffset = () => {
  nextTick(() => {
    if (currencyTextRef.value) {
      textWidth.value = currencyTextRef.value.clientWidth
      currencyOffset.value =
        inputPaddingLeft.value +
        (textWidth.value >= inputWidth.value ? inputWidth.value : textWidth.value)
    }
  })
}

onMounted(() => {
  valueRef.value = prepareRealValue(props.value || props.modelValue)
  if (inputRef.value) {
    const inputComputedStyles = window.getComputedStyle(inputRef.value)

    inputPaddingLeft.value = parseInt(inputComputedStyles.paddingLeft)
    inputWidth.value =
      inputRef.value.clientWidth -
      inputPaddingLeft.value -
      parseInt(inputComputedStyles.paddingRight)

    setCurrencyOffset()

    if (props.autofocus) {
      inputRef.value.focus()
    }
  }
})

const inputHandler = () => {
  emit('input', prepareModelValue(valueRef.value))
}

const onFocusHandler = (e: Event) => {
  focusFlag.value = true
  emit('focus', e)
}

const onBlurHandler = (e: Event) => {
  focusFlag.value = false
  emit('blur', e)
}

const clearInput = () => {
  valueRef.value = ''
  emit('input', prepareModelValue(valueRef.value))
  emit('clear', prepareModelValue(valueRef.value))
}

const setMax = () => {
  if (props.max) {
    valueRef.value = props.max.toString()
    emit('input', prepareModelValue(valueRef.value))

    nextTick(() => {
      inputRef.value.focus()
    })
  }
}
watch(valueRef, (val) => {
  valueRef.value = prepareRealValue(val)

  emit('update:modelValue', prepareModelValue(valueRef.value))
  setCurrencyOffset()
})

// update value from modelValue changed outside
watch(
  () => props.modelValue,
  (val) => {
    valueRef.value = prepareRealValue(val)
  }
)

// update value from :value prop
watch(
  () => props.value,
  (val) => {
    valueRef.value = prepareRealValue(val)
  }
)

watch(placeholderShown, () => {
  setCurrencyOffset()
})
// }
</script>

<style scoped lang="scss">
@import 'styles.scss';
</style>
