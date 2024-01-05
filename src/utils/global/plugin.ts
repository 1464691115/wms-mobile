import * as globalUtils from '@/utils/global'
import { App } from 'vue'

export default {
  install(app: App) {
    Object.assign(app.config.globalProperties, globalUtils)
    Object.assign(uni, globalUtils)
  },
}
