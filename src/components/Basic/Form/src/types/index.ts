import { CSSProperties } from "vue";

export namespace BasicForm {

    export interface FormProps {
        /** 整个表单标题 */
        formTitle?: string;

        /** 提交方法 */
        submitApiFunc?: (...arg) => Promise<any>;


        /** 扩展 form 组件，增加 label 宽度，表单内所有组件适用，可以单独在某个项覆盖或者禁用 */
        labelWidth?: number | string
        /** 扩展 form 组件，label 的水平位置 */
        labelAlign?: 'start' | 'center' | 'end'

        /** 表单布局 */
        layout?: 'horizontal' | 'vertical'


        /** 间距 [垂直间距,水平间距] */
        gutter?: [number | string, number | string]

        /** 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局 */
        baseColProps?: ColEx

        /** 配置所有 Row 的 style 样式 */
        baseRowStyle?: CSSProperties

        /** 是否在label后加 冒号 */
        colon?: boolean | string

        /** 表单配置 */
        schemas?: FormSchema[];

        /** 是否显示重置按钮 默认 true*/
        showResetButton?: boolean;
        /** 重置按钮配置 */
        resetButtonOptions?: ActionButtonOption;
        /** 是否显示提交按钮   默认 true*/
        showSubmitButton?: boolean;
        /** 确认按钮配置 */
        submitButtonOptions?: ActionButtonOption;
        /** 自定义重置按钮逻辑 */
        resetFunc?: () => Promise<void>;
        /** 自定义提交按钮逻辑 */
        submitFunc?: () => Promise<void>;
    }


    export interface ActionButtonOption {
        text?: string;
    }

    export interface FormSchema extends Pick<FormProps, 'colon' | 'labelWidth' | 'labelAlign' | 'layout'> {
        field: string

        label?: string | ((schemaItem: Exclude<FormSchema, 'label'>) => string)

        colProps?: FormProps['baseColProps']
        rowStyle?: FormProps['baseRowStyle']
        /** 组件类型 */
        component?: ComponentType
        /** 所渲染的组件的 props */
        componentProps?: any
    }


    export type ComponentType = | 'Input'
        | 'Textarea'
        | 'Select'
        | 'ApiSelect'
        | 'TimePicker'

    export type ColEx = {

        /** 24 个 栅格占位格数，为 0 时相当于 display: none */
        span: number
    }

    type IgnoreRecrod<K extends string, T = any> = Record<K, T> & Record<string, any>

    export type FormMethodsType<T extends Record<any, any> = FormProps, F extends string = Exclude<T['schemas'], undefined>[number]['field']> = {
        getFieldsValue: () => IgnoreRecrod<F>;
        setFieldsValue: (values?: Partial<IgnoreRecrod<F>>) => Promise<unknown>;
        resetFields: () => Promise<unknown>;
        submit: () => Promise<unknown>;
        setProps: (_formProps: Partial<BasicForm.FormProps>) => void;
        getProps: () => BasicForm.FormProps;
        /** 如果自定义删除或者 删除新添加的 schema的话请使用 字符串删除 */
        removeSchemaByFiled: (filed: string | F[]) => Promise<any>;
        appendSchemaByField: (schema: BasicForm.FormSchema, prefixField?: string, first?: boolean) => Promise<any>
        updateSchema: (data: Partial<BasicForm.FormSchema> | Partial<BasicForm.FormSchema>[]) => Promise<any>;
        resetSchema: (data: Partial<BasicForm.FormSchema> | Partial<BasicForm.FormSchema>[]) => Promise<unknown>;
    }
}
