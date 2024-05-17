import * as globalUtils from '@/utils/global'
import { custom } from 'cli/writeFill/custom'
import { globalIcon } from '@/components/Basic/Icon'
import { Ref } from 'vue'

export {}

declare module 'vue' {
  type globalUtilsType = typeof globalUtils
  type globalIconType = typeof globalIcon

  export type UnRef<T> = T extends Ref<infer P> ? P : Partial

  export interface ComponentCustomProperties
    extends globalUtilsType,
      globalIconType {}

  type GlobalComponentsType = {
    NavBarCustom: typeof import('@/components/NavBarCustom/NavBarCustom.vue').default
  }

  /** 全局组件 */
  export interface GlobalComponents extends GlobalComponentsType {}

  export interface SVGAttributes {
    mode: 0 | 1
  }

  export type ComponentPublicInstanceConstructor<
    T extends ComponentPublicInstance<
      Props,
      RawBindings,
      D,
      C,
      M
    > = ComponentPublicInstance<any>,
    Props = any,
    RawBindings = any,
    D = any,
    C extends ComputedOptions = ComputedOptions,
    M extends MethodOptions = MethodOptions,
  > = {
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
    new (...args: any[]): T
  }
}
