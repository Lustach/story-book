import type { Preview } from '@storybook/vue3'
//*next lines need for evade TypeError: _ctx.$t is not a function
import { setup } from '@storybook/vue3';
import { i18n } from '@/plugins/i18n';
setup((app) => {
   app.use(i18n)
});
//*
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
