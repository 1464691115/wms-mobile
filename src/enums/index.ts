/** 页面加载的状态 */
export enum PAGE_LOAD_STATUS {
  success = 'success',
  fail = 'fail',
  loading = 'loading'
}

/** 图标 */
export enum ICON_UNICODE {
  TAB1 = '&#xe60d;',
  TAB1SELECTED = '&#xe610;',
  TAB2 = '&#xe60e;',
  TAB2SELECTED = '&#xe60a;',
}

export type ICON_UNICODE_VALUE = keyof { [Key in keyof typeof ICON_UNICODE as `${typeof ICON_UNICODE[Key]}`]: any } | keyof typeof ICON_UNICODE


/** 缓存key */
export enum STORAGE_KEY {
}

/** 事件监听key */
export enum EMIT_ON_KEY {
  SET_FILE_PATH = 'setFilePath'
}