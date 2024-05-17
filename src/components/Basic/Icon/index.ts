import type { App } from 'vue'

/** 图标  https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4550051 */
export enum ICON_UNICODE {
  PRINT = "&#x\e863",
  RILI = "&#x\e8b4",
  CLOSE = "&#x\e69a",
  ARROW = "&#x\e664",
  SEARCH = "&#x\e611",
  LOADING = "&#x\e73c",
  ARROW_LEFT = "&#x\e608",
  QUESHENGYE_KONGBAIYE_TONGYONG = "&#x\e75f",
  QUESHENGYE_QINGDENGDAI = "&#x\e760",
  QUESHENGYE_ZANWUDIZHI = "&#x\e761",
  QUESHENGYE_ZANWUDONGTAI = "&#x\e762",
  QUESHENGYE_ZANWUGONGZUO = "&#x\e763",
  QUESHENGYE_ZANWULINGGAN = "&#x\e764",
  QUESHENGYE_ZANWUHUIYI = "&#x\e765",
  QUESHENGYE_ZANWULIANXIFANGSHI = "&#x\e766",
  QUESHENGYE_ZANWUJILU = "&#x\e767",
  QUESHENGYE_ZANWUDUANXIN = "&#x\e768",
  QUESHENGYE_ZANWUFANGAN = "&#x\e769",
  QUESHENGYE_ZANWUJIAOFEI = "&#x\e76a",
  QUESHENGYE_ZANWUSHUJU = "&#x\e76b",
  QUESHENGYE_ZANWUSOUSUO = "&#x\e76c",
  QUESHENGYE_ZANWUSHENPI = "&#x\e76d",
  QUESHENGYE_ZANWUJIHUA = "&#x\e76e",
  QUESHENGYE_ZANWURENWU = "&#x\e76f",
  QUESHENGYE_ZANWUXIAOXI = "&#x\e770",
  QUESHENGYE_ZANWUWENTI = "&#x\e771",
  QUESHENGYE_ZANWUYUJING = "&#x\e772",
  QUESHENGYE_ZANWUWANGLUO = "&#x\e773",
  QUESHENGYE_ZANWUYIJIAN = "&#x\e774",
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
