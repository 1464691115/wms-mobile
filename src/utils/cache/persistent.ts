import type { UserInfo } from '#/store'
import { TOKEN_KEY, USER_ID_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'

export interface BasicStore {
  [TOKEN_KEY]: string
  [USER_INFO_KEY]: UserInfo
  [USER_ID_KEY]: string
}

type LocalStore = BasicStore

export type BasicKeys = keyof BasicStore
type LocalKeys = keyof LocalStore

export class Persistent {
  static getLocal<T extends LocalKeys>(key: T) {
    return uni.getStorageSync(key) as LocalStore[T]
  }

  static setLocal(
    key: LocalKeys,
    value: NonNullable<LocalStore[LocalKeys]> = '',
    immediate = true,
  ): void {
    if (immediate) {
      uni.setStorageSync(key, value)
    } else {
      uni.setStorage({
        key,
        data: value,
      })
    }
  }

  static removeLocal(key: LocalKeys, immediate = true): void {
    if (immediate) {
      uni.removeStorageSync(key)
    } else {
      uni.removeStorage({
        key,
      })
    }
  }

  static clearLocal(immediate = true): void {
    uni[immediate ? 'clearStorage' : 'clearStorageSync']()
  }
}
