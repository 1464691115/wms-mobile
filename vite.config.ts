import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://wmsapi.lkstree.cloud',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [uni(), VueSetupExtend(), DefineOptions()],
  resolve: {
    alias: {
      '@': resolve('./src/'),
    },
  },
})
