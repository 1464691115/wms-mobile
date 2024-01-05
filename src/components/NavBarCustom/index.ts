import { App } from 'vue'
import NavBarCustomVue from './NavBarCustom.vue'

export function getStatusBarHeigh() {
  return uni.getSystemInfoSync()?.statusBarHeight || 44
}

export default {
  install(app: App) {
    app.component('NavBarCustom', NavBarCustomVue)
  },
}
