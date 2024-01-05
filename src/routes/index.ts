// TODO 尾部可以不删除默认导入带的.vue，编译路由的时候会遍历删除 (别的地方跳转用到的话必须去掉)
export enum ROUTES_URL {
  TOP_SCREEN = '/pages/top-screen/index',
  HOME = '/pages/home/index',
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
    navigationBarBackgroundColor: '#EEF1F4',
    navigationBarTextStyle: 'black',
    ...(opt || {}),
  }
}

const routes: routesType = [
  {
    path: ROUTES_URL.TOP_SCREEN,
    style: navigationBlock({
      navigationStyle: 'custom',
      navigationBarTextStyle: 'white',
    }),
  },
  {
    path: ROUTES_URL.HOME,
    style: navigationBlock({
      navigationStyle: 'custom',
      navigationBarTextStyle: 'white',
    }),
  },
]

export const tabBarList = [].map((el) => ({
  ...el,
  pagePath: el.pagePath.slice(1),
}))

export default routes
  .concat(Object.values(testUrl).map((el) => ({ path: el })))
  .map((el) => {
    el.path = el.path.replace(/\/pages/g, 'pages').replace(/\.vue/g, '')
    return el
  }) as routesItem[]
