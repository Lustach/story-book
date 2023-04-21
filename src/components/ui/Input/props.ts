import type { PropType } from 'vue'
export default interface Props {
  id: string
  label: string
  placeholder: string
  autofocus?: boolean
  type?: string
  modelValue?: string
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
}
