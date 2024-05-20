import { BaseButtonPropsType } from '@/components/Basic/Button/props'
import { BaseFormPropsType } from '../props'

export enum ComponentOptions {
  Input = 'Input',
  InputNumber = 'InputNumber',
  GroupRadio = 'GroupRadio',
  ApiSelect = 'ApiSelect',
  Textarea = 'Textarea',
  Upload = 'Upload',
  DateTime = 'DateTime',
  Switch = 'Switch',
}

export const COMPONENT_OPTIONS_TEXT = {
  [ComponentOptions.Input]: '输入框',
  [ComponentOptions.GroupRadio]: '选择框',
  [ComponentOptions.Textarea]: '多行输入框',
  [ComponentOptions.DateTime]: '时间选择框',
}

export namespace BasicForm {
  export interface RenderCallbackParams {
    /** 当前 schemas */
    schema: FormSchema
    /** 表单所有值 */
    values: any
    /** 表单的双向绑定对象，这个值是响应式的。所以可以方便处理很多操作 */
    model: any
    /** 字段属性名 */
    field: string
  }

  export interface ActionButtonOption extends BaseButtonPropsType { }

  export interface FormSchema
    extends Pick<
      Partial<BaseFormPropsType>,
      'colon' | 'labelWidth' | 'labelAlign' | 'layout'
    > {
    field: string

    label?: string | ((schemaItem: Exclude<FormSchema, 'label'>) => string)

    defaultValue?: string | number | object

    required?: boolean
    /** 判断当前组件是否禁用 */
    dynamicDisabled?: boolean
    rule?: string | RegExp
    ruleMsg?: string

    colProps?: BaseFormPropsType['baseColProps']
    rowStyle?: BaseFormPropsType['baseRowStyle']
    ifShow?: Boolean | ((renderCallbackParams: RenderCallbackParams) => Boolean)
    /** 组件类型 */
    component?: ComponentType
    /** 所渲染的组件的 props */
    componentProps?: any
    /** 自定义组件插槽名 */
    slot?: string
  }

  export type ComponentType = ComponentOptions

  export type ColEx = {
    /** 24 个 栅格占位格数，为 0 时相当于 display: none */
    span: number
  }

  type IgnoreRecord<K extends string, T = any> = Record<K, T> &
    Record<string, any>

  export type FormMethodsType<
    T extends Record<any, any> = BaseFormPropsType,
    F extends string = Exclude<T['schemas'], undefined>[number]['field'],
  > = {
    getFieldsValue: () => IgnoreRecord<F>
    setFieldsValue: (values?: Partial<IgnoreRecord<F>>) => Promise<unknown>
    resetFields: () => Promise<unknown>
    submit: () => Promise<unknown>
    validate: () => Promise<IgnoreRecord<F>>
    setProps: (_BasePropsType: Partial<BaseFormPropsType>) => void
    getProps: () => BaseFormPropsType
    /** 如果自定义删除或者 删除新添加的 schema的话请使用 字符串删除 */
    removeSchemaByFiled: (field: string | F[]) => Promise<any>
    appendSchemaByField: (
      schema: BasicForm.FormSchema,
      prefixField?: string,
      first?: boolean,
    ) => Promise<any>
    updateSchema: (
      data: Partial<BasicForm.FormSchema> | Partial<BasicForm.FormSchema>[],
    ) => Promise<any>
    resetSchema: (
      data: Partial<BasicForm.FormSchema> | Partial<BasicForm.FormSchema>[],
    ) => Promise<unknown>
  }
}
