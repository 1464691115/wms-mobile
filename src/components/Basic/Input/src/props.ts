import { ICON_UNICODE } from './../../Icon/index'
import { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const baseSInputProps = {
  /** 前置图标 */
  iconPrefix: { type: String as PropType<ICON_UNICODE> },
  /** 后置图标 */
  iconSuffix: { type: String as PropType<ICON_UNICODE> },
  /** 占位符 */
  placeholder: { type: String },
  /** 是否禁用 默认为false */
  disabled: { type: Boolean, default: false },
  /** 是否密码类型 */
  password: { type: Boolean },
  /** 是否显示清空按钮 默认为false */
  clearable: { type: Boolean, default: false },
  /** 是否显示边框，默认显示 */
  inputBorder: { type: Boolean },

  /** 前置内容(可配置插槽) */
  textPrepend: { type: String },
  /** 后置内容(可配置插槽) */
  textAppend: { type: String },
  /** 绑定的值 */
  modelValue: { type: [String, Number] },

  inputStyle: Object as PropType<CSSProperties>,

  /** 输入框类型 */
  type: { type: String, default: 'text' },

  //TODO 原生属性
  maxlength: Number,
  minlength: Number,
  autocomplete: String as PropType<'on' | 'off'>,
  name: String,
  readonly: Boolean,
  focus: Boolean,
}

export type BaseSInputProps = ExtractPropTypes<typeof baseSInputProps>
