import type { App } from 'vue'

/** 图标  https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4550051 */
export enum ICON_UNICODE {
  SAOYISAO = "&#x\e7d0",
  YUNDANHUOPIN = "&#x\e622",
  CANGCHUGAILAN = "&#x\e7d2",
  CANGCHUZUOYEBAOBIAO = "&#x\e7d3",
  GONGYINGSHANGZILIAO = "&#x\e7d4",
  HUIZONGTONGJIGUANLI = "&#x\e7d5",
  DIDIANXIANLU = "&#x\e7d6",
  JICHUSHUJU = "&#x\e7d7",
  CHUKUGUANLI = "&#x\e7d8",
  JIFEIGUANLI = "&#x\e7d9",
  BAOBIAOGUANLI = "&#x\e7da",
  JIESUANJICHUSHUJU = "&#x\e7db",
  JIEKOUGUANLI = "&#x\e7dc",
  JIAGONGGUANLI = "&#x\e7dd",
  RUKUGUANLI = "&#x\e7de",
  KUCUNGUANLI = "&#x\e7df",
  JIANKONGYUJING = "&#x\e7e0",
  QIYEJIGUANLI = "&#x\e7e1",
  XULIEHAOKUCUNGUANLI = "&#x\e7e2",
  FEISHUAIGUANLI = "&#x\e7e3",
  KUCUNCHAXUN = "&#x\e7e4",
  KEHUZILIAO = "&#x\e7e5",
  CANGKUJICHUSHUJU = "&#x\e7e6",
  CANGKUCELVEGUANLI = "&#x\e7e7",
  KUCUNKESHIHUAGUANLI = "&#x\e7e8",
  JIFEIZHIHANGGUANLI = "&#x\e7e9",
  JICHUSHUJUGUANLI = "&#x\e7ea",
  SHEBEIZICHANGUANLI = "&#x\e7eb",
  YONGHU = "&#x\e7ec",
  MORENBIANLIANGGUANLI = "&#x\e7ed",
  YUETAIGUANLI = "&#x\e7ee",
  YUEKUCHAXUN = "&#x\e7ef",
  DANJUGUANLI = "&#x\e7f0",
  SHANGPINSHUJU = "&#x\e7f1",
  XITONGPEIZHI = "&#x\e7f2",
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
