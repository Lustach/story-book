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
      <component
        :is="currentIcon"
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

    <div v-if="withCopy && valueRef" class="input__copy">
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
import { computed, ref, watch, nextTick, onMounted } from 'vue'
// import copyToClipboard from '@/helpers/copyToClipboard'
import { useClipboard } from '@vueuse/core'
import type { PropType } from 'vue'
const props = withDefaults(
  defineProps<{
    id: string
    label: string
    placeholder: string
    modelValue: string
    autofocus?: boolean
    type?: string
    value?: [string, Number]
    labelInfo?: boolean
    autocomplete?: boolean
    hardAutocompleteOff?: boolean | false
    disabled?: boolean | undefined
    max?: [Number, string]
    min?: Number
    currency?: string
    showSetMax?: boolean
    showErrorText?: boolean
    error?: [string, boolean]
    icon?: string
    withCopy?: boolean
    text?: string
    background?: string
    clearable?: boolean
    dataQa?: PropType<string | null>
  }>(),
  {
    type: 'text',
    placeholder: 'test',
    label: 'label',
    modelValue: ''
  }
)
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input', 'clear', 'iconClick'])

const { copy } = useClipboard()

const valueRef = ref('')
const currentIcon = ref()
const focusFlag = ref(false)
const hide = ref(false)
const isCopied = ref(false)
const isTypeCurrency = computed(() => props.type === 'currency')
const currencyOffset = ref(0)

// DOM
const currencyTextRef = ref()
const inputRef = ref()
const textWidth = ref(0)
const inputPaddingLeft = ref(0)
const inputWidth = ref(0)

// if (props.icon) {
//   import(`@/assets/icons/input/${props.icon}.svg`).then((val) => {
//     currentIcon.value = markRaw(val.default)
//   })
// }

const inputType = computed(() => {
  if (props.type === 'password') {
    return hide.value ? 'text' : 'password'
  } else if (props.type === 'currency') {
    return 'text'
  }

  return props.type
})

// when focus, placeholder = ''
const dynamicPlaceholder = computed(() => (focusFlag.value ? '' : props.placeholder))

const placeholderShown = computed(() => {
  return !focusFlag.value && !!dynamicPlaceholder.value && !valueRef.value
})

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

const copyValue = () => {
  copy(props.modelValue)
  isCopied.value = true

  setTimeout(() => {
    isCopied.value = false
  }, 1500)
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
// }
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  &.noIcon {
    input {
      padding-left: 12px;
    }
  }

  // & svg {
  //   position: absolute;
  // }
  & label {
    font-size: 14px;
    line-height: 17px;
    color: $mid-gray;
    position: absolute;
    top: 12px;
    left: 15px;
    z-index: 1;
    font-family: 'Panton_SemiBold';

    @include laptop {
      font-size: 12px;
      top: 8px;
    }
  }

  &__label-info {
    position: absolute;
    margin-left: 9px;

    &:hover {
      fill: $too-dark-blue;
    }
  }

  & input {
    @include input;
    text-indent: 2px;

    &.input__currency {
      padding-right: 15px;
    }

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      border: 1px solid $blue;
    }

    &:disabled {
      background: $too-ligth-gray;
      color: $mid-blue;
    }
  }

  &--type {
    &--currency {
      & input {
        padding-right: 90px; // 50px + currency (4 chars)
      }
    }
  }

  &__icon {
    max-width: 14px;
    max-height: 16px;
    left: 17px;
    bottom: 20px;
    position: absolute;

    &--disabled {
      fill: $mid-blue !important;
    }

    &[data-icon='sidebar__search-field__icon'] {
      @include laptop {
        bottom: 13px;
      }
    }
  }

  &__visibility-icon,
  &__copy {
    right: 17px;
    bottom: 14px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;

    &:hover {
      fill: $blue;
    }
  }

  &__clear-icon {
    position: absolute;
    //top: 0;
    bottom: 0;
    margin: auto 0;
    top: calc(100% - 54px);
    right: 17px;
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
      cursor: pointer;
      bottom: 3px !important;
      fill: $mid-blue;

      &:hover {
        fill: $red;
      }
    }
  }

  &__copy {
    width: 14px;
    height: 15px;
  }

  &__text {
    position: absolute;
    right: 17px;
    bottom: 14px;
    font-size: 14px;
    line-height: 30px;
    font-family: 'Panton_Bold';
    text-transform: uppercase;
  }

  &__error {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: -32px;
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
    color: $red;

    & svg {
      position: relative;
      margin-right: 8px;
    }
  }

  &__tooltip {
    background-color: $too-ligth-gray;
    text-align: center;
    border-radius: 6px;
    padding: 8px 9px;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 7px);
    box-shadow: 0 4px 25px rgba(63, 54, 137, 0.25);
    font-size: 12px;
    line-height: 16px;
    color: $too-dark-blue;

    &::after {
      content: '';
      position: absolute;
      bottom: 98%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-radius: 2px;
      border-style: solid;
      border-color: transparent transparent $too-ligth-gray transparent;
    }
  }

  &__max {
    right: 16px;
    bottom: 9px;
    position: absolute;
    cursor: pointer;
    font-size: 14px;
    line-height: 30px;
    font-family: 'Panton_Bold';
  }

  &__currency {
    position: absolute;
    bottom: 16px;
    padding-left: 5px;
    font-family: 'Panton_SemiBold';
    font-size: 14px;
    line-height: 17px;
    color: $dark-blue;
    transition: left 0.1ms;
  }

  &__hidden-value {
    position: absolute;
    opacity: 0;
    z-index: -100;
    font-size: 14px;
    font-family: 'Panton_SemiBold';
    text-indent: 2px;
  }
}

.error {
  & input {
    border: 1px solid $red !important;

    &:focus {
      border: 1px solid $blue;
    }
  }
}

.empty {
  & input {
    border-radius: 0;
    border: none;
    padding: 2px 20px 8px 31px;
    border-bottom: 1px solid $too-ligth-blue;

    &:focus {
      border-radius: 0;
      border: none;
      border-bottom: 1px solid $blue;
    }
  }

  .input__icon {
    left: 0;
    bottom: 6px;
    max-width: 20px;
    max-height: 20px;
    fill: $too-dark-blue;

    @include md {
      max-width: 16px;
      max-height: 16px;
      cursor: pointer;
    }
  }

  .input__clear-icon {
    right: 0;
    bottom: 11px;
  }
}

// .input input:focus + .input__error {
//   display: none;
// }
</style>
