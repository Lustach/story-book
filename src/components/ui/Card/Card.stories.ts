import type { Meta, StoryObj } from '@storybook/vue3'
import Card from './Card.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: 'Example/Card',
  component: Card,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: String,
    subHeader: String,
    media: String,
    supportingText: String,
    buttonText: String
  },
  args: { primary: false } // default value
}

export default meta
type Story = StoryObj<typeof Card>
export const Primary: Story = {
  args: {
    title: 'Example title',
    subHeader: 'Secondary text'
  }
}
export const Secondary: Story = {
  args: {
    title: 'Example title',
    subHeader: 'Media text',
    mediaHref: 'http://localhost:5173/src/assets/fund_default_logo.png'
  }
}
export const Third: Story = {
  args: {
    title: 'Example title',
    subHeader: 'Example with supporting text',
    mediaHref: 'http://localhost:5173/src/assets/fund_default_logo.png',
    supportingText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
}
export const Fourth: Story = {
  args: {
    title: 'Example title',
    subHeader: 'Example with supporting text',
    mediaHref: 'http://localhost:5173/src/assets/fund_default_logo.png',
    supportingText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    buttonText: 'go'
  }
}
// const Template = (args) => ({
//   components: { Card },
//   setup() {
//     return { args }
//   },
//   template: '<Card v-bind="args" />'
// })

// export const Primary = Template.bind({})
// Primary.args = { title: 'Example title', subHeader: 'Secondary text' }

// export const Secondary = Template.bind({})
// Secondary.args = { title: 'Example title', subHeader: 'Media text', mediaHref: 'placeholder.svg' }

// export const Third = Template.bind({})
// Third.args = {
//   title: 'Example title',
//   subHeader: 'Example with supporting text',
//   mediaHref: 'placeholder.svg',
//   supportingText:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
// }

// export const Fourth = Template.bind({})
// Fourth.args = {
//   title: 'Example title',
//   subHeader: 'Example with supporting text',
//   mediaHref: 'placeholder.svg',
//   supportingText:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   buttonText: 'go'
// }
