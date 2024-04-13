import { ROUTES_URL } from '@/routes'
import to from './to'

export function toBack() {
  uni.navigateBack()
}

export function toHome() {
  to({
    url: ROUTES_URL.HOME,
  })
}
