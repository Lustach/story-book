<template>
  <div
    class="input"
    :class="{
      empty: type === 'empty',
      noIcon: !icon,
      error,
      'error--text': showErrorText
    }"
  >
    {{ valueRef }}
    <label :for="id">
      {{ label }}
      <Tooltip v-if="tooltipText" :text="tooltipText">
        <component :is="iconInfo" class="input__label-info" />
      </Tooltip>
    </label>
    <input
      :id="id"
      ref="inputRef"
      v-model="valueRef"
      :type="inputType"
      :placeholder="placeholder"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :disabled="disabled"
      spellcheck="false"
      :style="{ background }"
      :readonly="hardAutocompleteOff"
      onfocus="this.removeAttribute('readonly')"
      :data-qa="dataQa"
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
    <transition name="fade">
      <div
        v-if="showSetMax && !valueRef && type !== 'password'"
        class="input__max"
        :data-qa="dataQa && `${dataQa}__max-button`"
        @click="setMax"
      >
        {{ $t('max') }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '@/components/ui/Tooltip/Tooltip.vue'
import iconClose from '@/components/icons/ui/close-icon-round.vue'
import iconCopy from '@/components/icons/ui/copy.vue'
import iconInfo from '@/components/icons/ui/info.vue'
import iconVision from '@/components/icons/ui/vision.vue'
import iconHide from '@/components/icons/ui/hide.vue'
import iconError from '@/components/icons/ui/error.vue'

import { computed, ref, nextTick, type Ref, type ComputedRef, type ModelRef } from 'vue'
import type { Props } from './props'

import { useClipboard } from '@vueuse/core'

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input', 'clear', 'iconClick'])

const inputRef = ref()
const valueRef = defineModel<string>('')

const { copyValue, isCopied } = useCopyValue(valueRef)
function useCopyValue(modelValue: ModelRef<string | undefined, string>): {
  copyValue: () => void
  isCopied: Ref<boolean>
} {
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

const { currentIcon } = useImportIcon(`/src/assets/icons/ui/${props.icon}.svg`)
function useImportIcon(url: string): { currentIcon: Ref<string> } {
  let currentIcon = ref('')
  if (props.icon) {
    currentIcon.value = new URL(url, import.meta.url).href
  }
  return {
    currentIcon
  }
}

const { hide, inputType } = useInputType()
function useInputType(): { hide: Ref<boolean>; inputType: ComputedRef<Props['type']> } {
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

const { onFocusHandler, onBlurHandler } = useFocuseFlag()
function useFocuseFlag(): {
  focusFlag: Ref<boolean>
  onFocusHandler: (e: Event) => void
  onBlurHandler: (e: Event) => void
} {
  const focusFlag = ref(false)
  const onFocusHandler = (e: Event) => {
    focusFlag.value = true
    emit('focus', e)
  }

  const onBlurHandler = (e: Event) => {
    focusFlag.value = false
    emit('blur', e)
  }
  return {
    onFocusHandler,
    onBlurHandler,
    focusFlag
  }
}

const setMax = () => {
  if (props.max) {
    valueRef.value = props.max.toString()
    emit('input', valueRef.value)

    nextTick(() => {
      inputRef.value.focus()
    })
  }
}

const clearInput = () => {
  valueRef.value = ''
}
</script>

<style scoped lang="scss">
@import 'styles.scss';
</style>
