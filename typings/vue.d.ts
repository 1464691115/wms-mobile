import * as globalUtils from '@/utils/global'
import * as globalEnum from '@/enums'
export { }

declare module '@vue/runtime-core' {

    type globalUtilsType = typeof globalUtils
    type globalEnumType = typeof globalEnum

    export interface ComponentCustomProperties extends globalUtilsType, globalEnumType {
    }
}