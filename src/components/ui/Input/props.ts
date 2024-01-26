// import type { PropType } from 'vue'
export interface Props {
  //data
  id: string
  label: string
  placeholder: string
  autofocus?: boolean
  type?: 'number' | 'password' | 'text' | 'currency' | 'empty' | ''
  modelValue: string
  value?: string
  autocomplete?: boolean
  hardAutocompleteOff?: boolean | false
  disabled?: boolean | undefined
  max?: number | string
  min?: number | string
  currency?: string
  showSetMax?: boolean
  error?: string
  showErrorText?: boolean
  withCopy?: boolean
  text?: string
  clearable?: boolean
  dataQa?: string | null
  //style
  icon?: string
  background?: string
  tooltipText?: string
}
