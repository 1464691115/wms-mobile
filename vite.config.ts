import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [uni(), VueSetupExtend(), DefineOptions()],
  resolve: {
    alias: {
      '@': resolve('./src/'),
    },
  },
})
