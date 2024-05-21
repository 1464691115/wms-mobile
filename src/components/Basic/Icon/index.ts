import type { App } from 'vue'

/** 图标  https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4550051 */
export enum ICON_UNICODE {
  COPY = "&#x\e6ae",
  TUBIAO_SHANCHU = "&#x\e60e",
  PRINT = "&#x\e863",
  RILI = "&#x\e8b4",
  CLOSE = "&#x\e69a",
  ARROW = "&#x\e664",
  SEARCH = "&#x\e611",
  LOADING = "&#x\e73c",
  ARROW_LEFT = "&#x\e608",
}


export type ICON_UNICODE_VALUE =
  | keyof {
    [Key in keyof typeof ICON_UNICODE as `${(typeof ICON_UNICODE)[Key]}`]: any
  }
  | keyof typeof ICON_UNICODE

export const globalIcon = { ICON_UNICODE }

export default {
  install(app: App) {
    app.config.globalProperties.ICON_UNICODE = ICON_UNICODE
  },
}
