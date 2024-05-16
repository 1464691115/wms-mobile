import type { App } from 'vue'

/** 图标  https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4550051 */
export enum ICON_UNICODE {
  RILI = "icon-rili",
  CLOSE = "icon-close",
  ARROW = "icon-arrow",
  SEARCH = "icon-search",
  LOADING = "icon-loading",
  ARROW_LEFT = "icon-arrow-left",
  QUESHENGYE_KONGBAIYE_TONGYONG = "icon-queshengye_kongbaiye-tongyong",
  QUESHENGYE_QINGDENGDAI = "icon-queshengye_qingdengdai",
  QUESHENGYE_ZANWUDIZHI = "icon-queshengye_zanwudizhi",
  QUESHENGYE_ZANWUDONGTAI = "icon-queshengye_zanwudongtai",
  QUESHENGYE_ZANWUGONGZUO = "icon-queshengye_zanwugongzuo",
  QUESHENGYE_ZANWULINGGAN = "icon-queshengye_zanwulinggan",
  QUESHENGYE_ZANWUHUIYI = "icon-queshengye_zanwuhuiyi",
  QUESHENGYE_ZANWULIANXIFANGSHI = "icon-queshengye_zanwulianxifangshi",
  QUESHENGYE_ZANWUJILU = "icon-queshengye_zanwujilu",
  QUESHENGYE_ZANWUDUANXIN = "icon-queshengye_zanwuduanxin",
  QUESHENGYE_ZANWUFANGAN = "icon-queshengye_zanwufangan",
  QUESHENGYE_ZANWUJIAOFEI = "icon-queshengye_zanwujiaofei",
  QUESHENGYE_ZANWUSHUJU = "icon-queshengye_zanwushuju",
  QUESHENGYE_ZANWUSOUSUO = "icon-queshengye_zanwusousuo",
  QUESHENGYE_ZANWUSHENPI = "icon-queshengye_zanwushenpi",
  QUESHENGYE_ZANWUJIHUA = "icon-queshengye_zanwujihua",
  QUESHENGYE_ZANWURENWU = "icon-queshengye_zanwurenwu",
  QUESHENGYE_ZANWUXIAOXI = "icon-queshengye_zanwuxiaoxi",
  QUESHENGYE_ZANWUWENTI = "icon-queshengye_zanwuwenti",
  QUESHENGYE_ZANWUYUJING = "icon-queshengye_zanwuyujing",
  QUESHENGYE_ZANWUWANGLUO = "icon-queshengye_zanwuwangluo",
  QUESHENGYE_ZANWUYIJIAN = "icon-queshengye_zanwuyijian",
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
