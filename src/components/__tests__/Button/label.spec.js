import Button from '@/components/ui/Button/Button.vue'
import { shallowMount } from '@vue/test-utils'
import { it, expect, describe, beforeEach } from 'vitest'

describe('testing label', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Button, {})
  })

  it('text', async () => {
    const label = 'Click'
    await wrapper.setProps({ label })
    expect(wrapper.props('label')).toContain('Click')
    expect(wrapper.find('button').text()).toBe('Click')
  })

  it('testing label, text empty string', async () => {
    const label = ''
    await wrapper.setProps({ label })
    expect(wrapper.props('label')).toContain(label)
    expect(wrapper.find('button').text()).toBe(label)
  })

  it('testing label, text undefined', async () => {
    let label
    await wrapper.setProps({ label })
    expect(wrapper.props('label')).toBeUndefined()
    expect(wrapper.find('button').text()).toBe('')
  })
})
