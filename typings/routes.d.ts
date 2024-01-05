import { ICON_UNICODE_VALUE } from '@/enums'

export type iconfontType = {
  /** 	字库 Unicode 码 */
  text: ICON_UNICODE_VALUE
  /** 	选中后字库 Unicode 码 */
  selectedText?: ICON_UNICODE_VALUE
  /** 	字体图标字号(px) */
  fontSize?: string
  /** 	字体图标颜色 */
  color?: string
  /** 	字体图标选中颜色 */
  selectedColor?: string
}

declare module '@/routes' {
  export type routesItem = {
    path: string
    style?: Partial<{
      /** #000000	导航栏背景颜色（同状态栏背景色），如"#000000"	 */
      navigationBarBackgroundColor: string
      /** 	white	导航栏标题颜色及状态栏前景颜色，仅支持 black/white	 */
      navigationBarTextStyle: 'black' | 'white'
      /** 		导航栏标题文字内容	 */
      navigationBarTitleText: string
      /** 		导航栏阴影，配置参考下方 导航栏阴影	 */
      navigationBarShadow: Object
      /** 	default	导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看使用注意	微信小程序 7.0+、百度小程序、H5、App（2.0.3+） */
      navigationStyle: 'default' | 'custom'
      /** 	false	设置为 true 则页面整体不能上下滚动（bounce效果），只在页面配置中有效，在globalStyle中设置无效	微信小程序（iOS）、百度小程序（iOS） */
      disableScroll: Boolean
      /** 	#ffffff	窗口的背景色	微信小程序、百度小程序、字节跳动小程序、飞书小程序、京东小程序 */
      backgroundColor: string
      /** 	dark	下拉 loading 的样式，仅支持 dark/light	 */
      backgroundTextStyle: string
      /** 	false	是否开启下拉刷新，详见页面生命周期。	 */
      enablePullDownRefresh: Boolean
      /** 	50	页面上拉触底事件触发时距页面底部距离，单位只支持px，详见页面生命周期	 */
      onReachBottomDistance: number
      /** 	#ffffff	顶部窗口的背景色（bounce回弹区域）	仅 iOS 平台 */
      backgroundColorTop: string
      /** 	#ffffff	底部窗口的背景色（bounce回弹区域）	仅 iOS 平台 */
      backgroundColorBottom: string
      /** 	false	是否禁用滑动返回	App-iOS（3.4.0+） */
      disableSwipeBack: Boolean
      /** 		导航栏图片地址（替换当前文字标题），支付宝小程序内必须使用https的图片链接地址	支付宝小程序、H5 */
      titleImage: string
      /** 	none	导航栏透明设置。支持 always 一直透明 / auto 滑动自适应 / none 不透明	支付宝小程序、H5、APP */
      transparentTitle: string
      /** 	NO	导航栏点击穿透	支付宝小程序、H5 */
      titlePenetrate: string
      /** 		设置编译到 H5 平台的特定样式，配置项参考下方 H5	H5 */
      h5: Object
      /** 		设置编译到 App 平台的特定样式，配置项参考下方 app-plus	App */
      'app-plus': Object
      /** 		设置编译到 mp-alipay 平台的特定样式，配置项参考下方 MP-ALIPAY	支付宝小程序 */
      'mp-alipay': Object
      /** 		设置编译到 mp-weixin 平台的特定样式	微信小程序 */
      'mp-weixin': Object
      /** 		设置编译到 mp-baidu 平台的特定样式	百度小程序 */
      'mp-baidu': Object
      /** 		设置编译到 mp-toutiao 平台的特定样式	字节跳动小程序 */
      'mp-toutiao': Object
      /** 		设置编译到 mp-lark 平台的特定样式	飞书小程序 */
      'mp-lark': Object
      /** 		设置编译到 mp-qq 平台的特定样式	QQ小程序 */
      'mp-qq': Object
      /** 		设置编译到 mp-kuaishou 平台的特定样式	快手小程序 */
      'mp-kuaishou': Object
      /** 		设置编译到 mp-jd 平台的特定样式	京东小程序 */
      'mp-jd': Object
      /** 		引用小程序组件，参考 小程序组件	App、微信小程序、支付宝小程序、百度小程序、京东小程序 */
      usingComponents: Object
      /** 	true	当存在 leftWindow时，当前页面是否显示 leftWindow	H5 */
      leftWindow: Boolean
      /** 	true	当存在 topWindow 时，当前页面是否显示 topWindow	H5 */
      topWindow: Boolean
      /** 	true	当存在 rightWindow时，当前页面是否显示 rightWindow	H5 */
      rightWindow: Boolean
      /** 		单位px，当浏览器可见区域宽度大于maxWidth时，两侧留白，当小于等于maxWidth时，页面铺满；不同页面支持配置不同的maxWidth；maxWidth = leftWindow(可选)+page(页面主体)+rightWindow(可选)	H5（2.9.9+） */
      maxWidth: number
    }>
  }

  export type routesType = routesItem[]
}
