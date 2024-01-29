import Button from '@/components/ui/Button/Button.vue'
import { shallowMount } from '@vue/test-utils'
import { it, expect, describe, beforeEach } from 'vitest'

describe('testing label', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Button, {})
  })

  it('testing primary', async () => {
    const primary = true
    await wrapper.setProps({ primary })
    expect(wrapper.props('primary')).toBe(primary)
    expect(wrapper.classes('storybook-button--primary')).toBe(true)
  })
  it('testing secondary', async () => {
    const primary = false
    await wrapper.setProps({ primary })
    expect(wrapper.props('primary')).toBe(primary)
    expect(wrapper.classes('storybook-button--secondary')).toBe(true)
  })
  it('testing noDecorations', async () => {
    const noDecorations = true
    await wrapper.setProps({ noDecorations })
    expect(wrapper.props('noDecorations')).toBe(noDecorations)
    expect(wrapper.classes('no-decorations')).toBe(true)
  })
  it('testing loading', async () => {
    const loading = true
    await wrapper.setProps({ loading })
    expect(wrapper.props('loading')).toBe(loading)
    expect(wrapper.classes('loading')).toBe(true)
  })
})
