/** 页面加载的状态 */
export enum PAGE_LOAD_STATUS {
  SUCCESS = 'success',
  FAIL = 'fail',
  LOADING = 'loading'
}

/** 缓存key */
export enum STORAGE_KEY {
}

/** 事件监听key */
export enum EMIT_ON_KEY {
  SET_FILE_PATH = 'setFilePath',
  /** 页面返回通讯 */
  PAGE_BACK_RESPONSE = 'PAGE_BACK_RESPONSE',
}


export { ICON_UNICODE } from '@/components/Basic/Icon/src/types/index'
export type { ICON_UNICODE_VALUE } from '@/components/Basic/Icon/src/types/index' 