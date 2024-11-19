import { ExtractPropTypes } from 'vue'


export const baseUploadProps = {
  /** 组件数据，通常用来回显 ,类型由return-type属性决定 ，格式见下文 */
  value: { type: [String] },

}

export type ApiSelectPropsType = ExtractPropTypes<typeof baseUploadProps> & {
  /** 组件禁用 */
  disabled: Boolean
  /** 组件只读，不可选择，不显示进度，不显示删除按钮 */
  readonly: Boolean
  /** 限制 value 格式，当为 object 时 ，组件只能单选，且会覆盖 */
  returnType: String
  /** 禁用图片预览，仅 mode:grid生效 */
  disablePreview: Boolean
  /** 是否显示删除按钮 */
  delIcon: Boolean
  /** 是否自动上传，值为false则只触发@select,可自行上传 */
  autoUpload: Boolean
  /** 最大选择个数 ，h5 会自动忽略多选的部分 */
  limit: Number
  /** 组件标题，右侧显示上传计数 */
  title: String
  /** 选择文件后的文件列表样式 */
  mode: String
  /** 选择文件类型,all 只支持 H5 和微信小程序平台 */
  fileMediatype: 'image' | 'video' | 'all'
  /** 选择文件后缀，字符串的情况下需要用逗号分隔（推荐使用字符串），根据 file-mediatype 属性而不同 */
  fileExtname: Array<string> | string
  /** mode:list 时的样式 */
  listStyles: Object
  /** mode:grid 时的样式 */
  imageStyles: Object
  /** 原图，compressed 压缩图，默认二者都有 */
  sizeType: Array<'original' | 'compressed'>
  /** 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项 */
  sourceType: Array<'album' | 'camera'>
}
