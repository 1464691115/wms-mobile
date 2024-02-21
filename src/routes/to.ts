import routerList, { tabBarList } from '@/routes'
import { queryParamsStr } from '@/utils'

type optParams = UniNamespace.NavigateToOptions &
  Pick<UniNamespace.SwitchTabOptions, 'url'> & {
    url?: string
    query?: Recordable
    /** 跳转方式 */
    toType?:
      | 'switchTab'
      | 'navigateTo'
      | 'redirectTo'
      | 'reLaunch'
      | 'navigateBack'
  }

function to(opt: optParams, isRefresh = false) {
  if (!opt.url && isRefresh) {
    opt.url = '/' + (getCurrentPages().slice(-1)?.[0]?.route || '')
    opt.animationType = 'none'
  }

  if (opt.query) {
    if (opt.url.includes('?')) opt.url += queryParamsStr(opt.query).slice(1, -1)
    else opt.url += queryParamsStr(opt.query)
  }

  if (
    opt.toType !== 'navigateBack' &&
    routerList.every((el) => !opt.url.includes(el.path))
  ) {
    console.warn('not found route, please check your opt`s url.')
    return
  }

  //TODO kesen: 2023-06-17  tabbar的页面路径开头没有 "/" 需要注意
  const isTabUrl = tabBarList.some((el) =>
    opt.url
      .split('?')[0]
      .split('/')
      .join('')
      .includes(el.pagePath.split('/').join('')),
  )

  if (!opt.toType) {
    opt.toType = isTabUrl ? 'switchTab' : 'navigateTo'
  }

  if (isTabUrl) {
    opt.toType = 'switchTab'
  } else opt.toType ||= 'navigateTo'

  uni[opt.toType as string](opt)
}

export default to
