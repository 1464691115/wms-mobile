import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import globalUtil from '@/utils/global/plugin'
import globalIcon from '@/components/Basic/Icon'
import NavBarCustom from './components/NavBarCustom'

export function createApp() {
  const app = createSSRApp(App)

  // Configure store
  // 配置 store
  setupStore(app)

  // 全局方法
  app.use(globalUtil)

  // 图标枚举
  app.use(globalIcon)

  // 全局顶部弹框
  app.use(NavBarCustom)

  return {
    app,
  }
}
