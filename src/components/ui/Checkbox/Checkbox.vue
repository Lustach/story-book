<template>
  <div class="checkbox">
    <input
      :id="id"
      type="checkbox"
      :value="value ? 'true' : undefined"
      :checked="value"
      :disabled="disabled"
      :data-qa="dataQa"
      @change="changeHandler"
    />
    <label :for="id">
      <span class="checkbox__checkmark">
        <template v-if="value">
          <checkmarkDisabled v-if="disabled" />
          <checkmark v-else />
        </template>
      </span>
      <span class="checkbox__label">
        {{ label }}
      </span>
    </label>
    <Tooltip v-if="info" :text="'text'">
      <info />
    </Tooltip>
  </div>
</template>

<script lang="ts" setup>
import Tooltip from '@/components/ui/Tooltip/Tooltip.vue'
import checkmark from '@/assets/icons/input/checkmark.svg'
import checkmarkDisabled from '@/assets/icons/input/checkmark-disabled.svg'
// import info from '@/assets/icons/info.svg'
const props = defineProps<{
  label?: string
  id?: string
  value: boolean
  info?: string
  disabled?: boolean
  dataQa?: string | null
}>()
const emit = defineEmits(['update:value', 'change'])
const changeHandler = () => {
  emit('update:value', !props.value)
  emit('change', !props.value)
}
</script>

<style scoped lang="scss">
@import 'styles.scss';
</style>
