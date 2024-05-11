import { APP_PRESET_COLOR } from './../settings/designSetting';
// TODO 尾部可以不删除默认导入带的.vue，编译路由的时候会遍历删除 (别的地方跳转用到的话必须去掉)
export enum ROUTES_URL {
  HOME = '/pages/home/index',
  NEW_PRODUCTS = '/pages/new-products/index',
  INBOUND_DOCUMENTS = '/pages/inbound-documents/index',
  LOGIN = '/pages/login/index',
}

/** 测试使用，只在开发环境生效 */
export const testUrl =
  process.env.NODE_ENV === 'development'
    ? {}
    : {
      defaultPage: '/pages/test/defaultPage',
    }

/** 导航栏 灰底的页面样式 */
function navigationBlock(title?: string): routesItem['style']
function navigationBlock(opt: routesItem['style']): routesItem['style']
function navigationBlock(opt) {
  return {
    navigationBarTitleText: typeof opt == 'string' ? opt : '',
    navigationBarBackgroundColor: APP_PRESET_COLOR,
    navigationBarTextStyle: 'white',
    ...(opt || {}),
  }
}

const routes: routesType = [
  {
    path: ROUTES_URL.LOGIN,
    style: navigationBlock({
      "navigationBarTitleText": "登录",
      "navigationStyle": "custom"
    }),
  },
  {
    path: ROUTES_URL.HOME,
    style: navigationBlock({
      navigationBarTitleText: '首页',
    }),
  },
  {
    path: ROUTES_URL.NEW_PRODUCTS,
    style: navigationBlock({
      navigationBarTitleText: '新增货品',
    }),
  },
  {
    path: ROUTES_URL.INBOUND_DOCUMENTS,
    style: navigationBlock({
      navigationBarTitleText: '入库单据',
    }),
  },

]

export const tabBarList = [].map((el) => ({
  // ...el,
  // pagePath: el.pagePath.slice(1),
}))

export default routes
  .concat(Object.values(testUrl).map((el) => ({ path: el })))
  .map((el) => {
    el.path = el.path.replace(/\/pages/g, 'pages').replace(/\.vue/g, '')
    return el
  }) as routesItem[]
