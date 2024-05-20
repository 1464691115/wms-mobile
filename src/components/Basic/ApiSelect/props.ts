import { ExtractPropTypes } from 'vue'

export type ApiSelectItemType = { label: string; value: string; disabled?: boolean } & Record<string, any>

export const apiSelectProps = {
    place: String,
    value: { type: [String, Number] },
    /** 传入 数组 作为初始数据，会被api返回的接口数据覆盖，在api存在的情况下只有第一次赋值有效 */
    list: { type: Array as PropType<any[] | Object> },
    /** 数据接口，接受一个 Promise 对象 */
    api: { type: Function as PropType<(...arg) => Promise<ApiSelectItemType[]>> },
    /** 接口参数。此属性改变时会自动重新加载接口数据 */
    params: Object,
    /** 是否立即请求接口，否则将在第一次点击时候触发请求 */
    immediate: { type: Boolean, default: true },
    /** 接口返回的字段，如果接口返回数组，可以不填。支持x.x.x格式 */
    resultField: { type: String, default: 'data' },
    /** 下拉数组项内label显示文本的字段，支持x.x.x格式 */
    labelField: { type: String, default: 'label' },
    /** 下拉数组项内value实际值的字段，支持x.x.x格式 */
    valueField: { type: String, default: 'value' },
    /** 是否显示右侧的按钮 */
    isRightIcon: Boolean
}

export type ApiSelectPropsType = ExtractPropTypes<typeof apiSelectProps>
