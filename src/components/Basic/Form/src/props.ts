import { CSSProperties, ExtractPropTypes } from "vue"
import { BasicForm } from "./types"

export const baseFormProps = {
    /** 是否显示 分号， 如果为 字符串则替换 */
    colon: { type: [Boolean, String] as PropType<boolean | string>, default: true },


    /** 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局 */
    baseColProps: { type: Object as PropType<BasicForm.ColEx> },
    /** 配置所有 Row 的 style 样式 */
    baseRowStyle: { type: Object as PropType<CSSProperties> },

    /** 扩展 form 组件，增加 label 宽度，表单内所有组件适用，可以单独在某个项覆盖或者禁用 */
    labelWidth: { type: [Number, String] as PropType<number | string> },
    /** 扩展 form 组件，label 的水平位置 */
    labelAlign: { type: String as PropType<'start' | 'center' | 'end'> },

    /** 间距 [垂直间距,水平间距] */
    gutter: { type: [] as PropType<[number | string, number | string]> },


    /** 整个表单标题 */
    formTitle: { type: String },


    /** 表单布局 */
    layout: { type: String as PropType<'horizontal' | 'vertical'> },


    /** 提交Api 接口或者方法 */
    submitApiFunc: { type: Function },

    /** 表单配置 */
    schemas: [Object] as PropType<BasicForm.FormSchema[]>,


    /** 是否显示操作按钮(重置/提交) */
    showActionButtonGroup: { type: Boolean, default: true },

    /** 是否显示重置按钮 默认 true*/
    showResetButton: { type: Boolean, default: true },
    /** 重置按钮配置 */
    resetButtonOptions: { type: Object as PropType<BasicForm.ActionButtonOption>, },
    /** 是否显示提交按钮   默认 true*/
    showSubmitButton: { type: Boolean, default: true },
    /** 确认按钮配置 */
    submitButtonOptions: { type: Object as PropType<BasicForm.ActionButtonOption>, },

    resetFunc: { type: Function as PropType<() => Promise<void>> },
    submitFunc: { type: Function as PropType<() => Promise<void>> },


    /** 
     * 用于将表单内一个字段的映射成 2 个字段, 例如 时间开始、结束
     * @description fieldMapToDouble
        将表单内时间区域的值映射成 2 个字段

        如果表单内有时间区间组件，获取到的值是一个数组，但是往往我们传递到后台需要是 2 个字段
    ``` javascript
        useForm({
            fieldMapToDouble: [
                // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间与结束时间
                ['datetime', ['startTime', 'endTime'], (val) => dateUtil(val).format('YYYY-MM-DD')],
                // 支持多个字段
                ['datetime1', ['startTime1', 'endTime1'], (val) => dateUtil(val).format('YYYY-MM-DD HH:mm:ss')],
            ],
        });
        
        // fieldMapToDouble没写的时候表单获取到的值
        {
            datetime: [String,String]
        }
    ```
    */
    fieldMapToDouble: { type: Array as PropType<[string, [string, string], ((val) => string)?][]> }
}



export type BaseFormPropsType = ExtractPropTypes<typeof baseFormProps>