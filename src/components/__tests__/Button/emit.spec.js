import { shallowMount } from '@vue/test-utils'
import Button from '@/components/ui/Button/Button.vue'
import { it, expect } from 'vitest'

it('emit by click', async () => {
  const wrapper = shallowMount(Button)
  await wrapper.find('button').trigger('click')
  expect(wrapper.emitted('click')).toBeTruthy()
  expect(wrapper.emitted('click')[0][0]).toBe(1)
})
