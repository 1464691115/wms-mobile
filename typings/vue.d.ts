import * as globalUtils from '@/utils/global'
import * as globalEnum from '@/enums'
export { }

declare module '@vue/runtime-core' {

    type globalUtilsType = typeof globalUtils
    type globalEnumType = typeof globalEnum

    export interface ComponentCustomProperties extends globalUtilsType, globalEnumType {
    }

    export type ComponentPublicInstanceConstructor<T extends ComponentPublicInstance<Props, RawBindings, D, C, M> = ComponentPublicInstance<any>, Props = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions> = {
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
        new(...args: any[]): T;
    };
}