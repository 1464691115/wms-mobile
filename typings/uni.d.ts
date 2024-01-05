/// <reference types="@dcloudio/types" />

const globalUtils = await import('@/utils/global/index')

type globalUtilsType<T = typeof globalUtils> = {
  [P in keyof T]: T[P]
}

declare interface Uni extends globalUtilsType {}
