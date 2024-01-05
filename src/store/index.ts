import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './modules/user'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

/** 初始化数据 */
export async function initStore() {
  const { initUserStore } = useUserStore()

  await initUserStore()

  return
}

export { store }
