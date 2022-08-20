export namespace BasicForm {

    export interface FormProps {
        /** 整个表单标题 */
        formTitle?: string;

        /** 提交方法 */
        submitApiFunc?: (...arg) => Promise<any>;

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

    export interface FormSchema {
        field: string
        label?: string | ((schemaItem: Exclude<FormSchema, 'label'>) => string)
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


    export type FormMethodsType = {
        getFieldsValue: () => any;
        setFieldsValue: (values?: {}) => Promise<unknown>;
        resetFields: () => Promise<unknown>;
        submit: () => Promise<unknown>;
        setProps: (_formProps: Partial<BasicForm.FormProps>) => void;
        removeSchemaByFiled: (filed: string | string[]) => Promise<any>;
        appendSchemaByField: (schema: BasicForm.FormSchema, prefixField?: string, first?: boolean) => Promise<any>
        updateSchema: (data: Partial<BasicForm.FormSchema> | Partial<BasicForm.FormSchema>[]) => Promise<any>;
        resetSchema: (data: Partial<BasicForm.FormSchema> | Partial<BasicForm.FormSchema>[]) => Promise<unknown>;
    }
}
