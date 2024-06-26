import type { App } from 'vue'

/** 图标  https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4121486 */
export enum ICON_COLOR_UNICODE {
  COLORQUESHENGYE_KONGBAIYE_TONGYONG = "&#x\e75f",
  COLORQUESHENGYE_QINGDENGDAI = "&#x\e760",
  COLORQUESHENGYE_ZANWUDIZHI = "&#x\e761",
  COLORQUESHENGYE_ZANWUDONGTAI = "&#x\e762",
  COLORQUESHENGYE_ZANWUGONGZUO = "&#x\e763",
  COLORQUESHENGYE_ZANWULINGGAN = "&#x\e764",
  COLORQUESHENGYE_ZANWUHUIYI = "&#x\e765",
  COLORQUESHENGYE_ZANWULIANXIFANGSHI = "&#x\e766",
  COLORQUESHENGYE_ZANWUJILU = "&#x\e767",
  COLORQUESHENGYE_ZANWUDUANXIN = "&#x\e768",
  COLORQUESHENGYE_ZANWUFANGAN = "&#x\e769",
  COLORQUESHENGYE_ZANWUJIAOFEI = "&#x\e76a",
  COLORQUESHENGYE_ZANWUSHUJU = "&#x\e76b",
  COLORQUESHENGYE_ZANWUSOUSUO = "&#x\e76c",
  COLORQUESHENGYE_ZANWUSHENPI = "&#x\e76d",
  COLORQUESHENGYE_ZANWUJIHUA = "&#x\e76e",
  COLORQUESHENGYE_ZANWURENWU = "&#x\e76f",
  COLORQUESHENGYE_ZANWUXIAOXI = "&#x\e770",
  COLORQUESHENGYE_ZANWUWENTI = "&#x\e771",
  COLORQUESHENGYE_ZANWUYUJING = "&#x\e772",
  COLORQUESHENGYE_ZANWUWANGLUO = "&#x\e773",
  COLORQUESHENGYE_ZANWUYIJIAN = "&#x\e774",
}

export type ICON_COLOR_UNICODE_VALUE =
  | keyof {
    [Key in keyof typeof ICON_COLOR_UNICODE as `${(typeof ICON_COLOR_UNICODE)[Key]}`]: any
  }
  | keyof typeof ICON_COLOR_UNICODE

export const globalIconColor = { ICON_COLOR_UNICODE: ICON_COLOR_UNICODE }

export default {
  install(app: App) {
    app.config.globalProperties.ICON_COLOR_UNICODE = ICON_COLOR_UNICODE
  },
}
