import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '@/components/ui/Input/Input.vue'

describe('BaseInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Input, {
      props: {
        id: 'input',
        label: 'Test Label',
        modelValue: 'Test Value',
        placeholder: 'placeholder',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      }
    })
  })

  it('emits input value when changed', async () => {
    await wrapper.find('input').setValue('test')
    expect(wrapper.props('modelValue')).toBe('test')
  })
})
