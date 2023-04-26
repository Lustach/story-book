import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/plugins/langs/**')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/styles/variables.scss";
        @import "@/assets/styles/colors.scss";
        @import "@/assets/styles/mixins/index.scss";
        @import "@/assets/styles/index.scss";`
      }
    }
  }
})
