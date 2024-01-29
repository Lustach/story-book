import Button from '@/components/ui/Button/Button.vue'
import { shallowMount } from '@vue/test-utils'
import { it, expect } from 'vitest'

const allowedSizes = ['small', 'medium', 'large']
for (const iterator of allowedSizes) {
  it(`testing sizes - ${iterator}`, () => {
    const wrapper = shallowMount(Button, {
      props: {
        size: iterator
      }
    })
    expect(wrapper.props('size')).toBe(iterator)
    expect(wrapper.classes(`storybook-button--${iterator}`)).toBe(true)
  })
}

it(`testing sizes - default(medium)`, () => {
  const wrapper = shallowMount(Button, {
    props: {}
  })
  expect(wrapper.classes(`storybook-button--medium`)).toBe(true)
})
