import { ExtractPropTypes, PropType } from 'vue'

export const baseModalProps = {
  /** 标题 */
  title: {
    type: String,
    default: '',
  },
  content: String, //提示的内容
  /** content 的对齐方式 */
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
  },
  /** 取消按钮的文字，默认为"取消" */
  cancelText: {
    type: String,
    default: '取消',
  },
  /** 取消按钮颜色 */
  cancelColor: {
    type: String,
    default: '#333333',
  },
  /** 确定按钮的文字，默认为"确定" */
  confirmText: {
    type: String,
    default: '确定',
  },
  /** 确认按钮颜色 */
  confirmColor: {
    type: String,
    default: '#007aff',
  },
  /** 是否显示取消按钮，默认为 true */
  showCancel: {
    type: [Boolean, String],
    default: true,
  },
  /** 是否显示模态框 */
  show: {
    type: [Boolean, String],
    default: false,
  },
  /** 是否展示遮罩 */
  mask: {
    type: [Boolean, String],
    default: true,
  },
  /** 点击遮罩是否自动关闭弹窗 */
  maskClosable: {
    type: [Boolean, String],
    default: false,
  },
  /** 关闭时销毁 Modal 里的子元素 */
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  /** 是否显示右上角关闭图标（注：本字段若为true 则maskClosable 自动关闭） */
  isCloseIcon: {
    type: Boolean,
    default: false,
  },
  isFooter: {
    type: Boolean,
    default: true,
  },
  closeFunc: {
    type: Function,
    default: (() => {}) as PropType<(...arg) => void>,
  },
}

export type BasePropsType = ExtractPropTypes<typeof baseModalProps>
