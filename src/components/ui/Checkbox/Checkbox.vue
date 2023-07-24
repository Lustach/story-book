<template>
  <div class="checkbox coloured">
    <label>
      <input type="checkbox" v-model="isChecked" :disabled="isDisabled" />
      {{ labelText }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface CheckboxProps {
  checked: boolean
  label: string
  disabled?: boolean
  value:
}

export default defineComponent({
  name: 'MyCheckbox',
  props: {
    checked: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props: CheckboxProps) {
    const isChecked = ref(props.checked)
    const isDisabled = ref(props.disabled)

    return {
      isChecked,
      isDisabled,
      labelText: props.label
    }
  }
})
</script>
<style lang="scss">
@import '@/assets/scss/ui/checkbox.scss';
</style>
