<template>
  <button type="button" :class="classes" @click="onClick" :style="style" :disabled="disabled">
    <span v-if="!loading">{{ label }}</span>
    <loadingIcon v-if="loading" class="rotating" />
  </button>
</template>

<script lang="ts" setup>
import loadingIcon from '@/components/icons/ui/load-btn.vue'
import './button.scss'
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    label: string
    /**
     * primary or secondary button
     */
    primary?: boolean
    /**
     * size of the button
     */
    size?: 'small' | 'medium' | 'large'
    /**
     * background color of the button
     */
    backgroundColor?: string
    /**
     * disabled or active button
     */
    disabled?: boolean
    /**
     * state of button
     */
    loading?: boolean
    /**
     * plain text button
     */
    noDecorations?: boolean
  }>(),
  { primary: false }
)

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

const classes = computed(() => ({
  'storybook-button': true,
  'storybook-button--primary': props.primary,
  'storybook-button--secondary': !props.primary,
  'no-decoration ': props.noDecorations,
  'loading ': props.loading,
  [`storybook-button--${props.size || 'medium'}`]: true
}))

const style = computed(() => ({
  backgroundColor: props.backgroundColor
}))

const onClick = () => {
  emit('click', 1)
}
</script>
