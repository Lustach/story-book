// import '@/assets/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/plugins/i18n'

import App from './App.vue'
import router from './router'
// import Icon from '@/components/Icon.vue'

const app = createApp(App)
// .component('icon', Icon)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
