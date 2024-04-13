import type { App } from 'vue'

/** 图标  https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4121486 */
export enum ICON_UNICODE {
  SEARCH = '&#xe611;',
  REGULATOR = '&#xe624;',
  PLAY = '&#xe66e;',
  ARROW_LEFT = '&#xe608;',
  ARROW_RIGHT = '&#xe890;',
  ARROW_RIGHT_1 = '&#xe664;',
  ARROW_DOWN = '&#xe60d;',
  CLOSE = '&#xe69a;',
  PENTAGRAM = '&#xe646;',
  PENTAGRAM_FILL = '&#xe647;',
  TIME = '&#xe834;',
  LOCAL = '&#xe612;',
  LOADING = '&#xe73c;',
  TOGGLE_FILL = '&#xe656;',
  EDIT = '&#xe61f;',
  DEL = '&#xe7ed;',
  HORN_FILL = '&#xe600;',
  CUSTOMER = '&#xe88f;',
  DIRECTORY = '&#xe67f;',
  LOCK = '&#xe7c9;',
  MICROPHONE = '&#xe62d;',
  TIME_OUT = '&#xea81;',
  STOP = '&#xe613;',
  COPY = '&#xe706;',
  TEACHER = '&#xe61a;',
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
