import { CSSProperties, ExtractPropTypes } from 'vue'

export const baseButtonProps = {
  /** 显示文字 */
  title: String,
  text: String,
  /** 按钮的样式类型 */
  type: String as PropType<
    'info' | 'primary' | 'error' | 'warning' | 'success'
  >,
  /** 按钮外观形状，见上方说明 */
  shape: String as PropType<'circle' | 'square'>,
  /** 按钮是否镂空，背景色透明 */
  plain: {
    type: Boolean,
    default: undefined,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否在加载 */
  loading: {
    type: Boolean,
    default: undefined,
  },
  /** 自定义样式 */
  customStyle: Object as PropType<CSSProperties>,
}

export type BaseButtonPropsType = ExtractPropTypes<typeof baseButtonProps>
