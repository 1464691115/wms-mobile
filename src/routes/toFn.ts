import { ROUTES_URL } from '@/routes'
import to from './to'
import { queryParamsStr } from '@/utils'

export function toBack() {
  uni.navigateBack()
}

export function toHome() {
  to({
    url: ROUTES_URL.HOME,
    toType: 'reLaunch'
  })
}

export function toLogin(rUrl) {
  to({
    url: ROUTES_URL.LOGIN + queryParamsStr({ rUrl }),
  })
}
