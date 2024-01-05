import { TOKEN_KEY } from '@/enums/cacheEnum'
import { Persistent } from '@/utils/cache/persistent'
import { showToast } from '../lib/s-view'

export function getToken() {
  return Persistent.getLocal(TOKEN_KEY)
}

export function getAuthCode() {
  return new Promise<string>((resolve) => {
    uni.login({
      provider: 'weixin',
      success(res) {
        resolve(res.code)
      },
      fail() {
        showToast('已取消')
      },
    })
  })
}
