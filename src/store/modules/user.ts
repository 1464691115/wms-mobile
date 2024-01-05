import { queryParamsStr } from '@/utils'
import type {
  GetUserInfoModel,
  LoginParams,
} from '@/service/sys/model/userModel'
import type { UserInfo } from '#/store'
import { TOKEN_KEY, USER_ID_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { Persistent } from '@/utils/cache/persistent'
import { defineStore } from 'pinia'
import { loginApi } from '@/service/sys/user'
import { uploadImgApi } from '@/service/sys/upload'
import { isNumber, isUrl } from '@/utils/is'
import { getAuthCode } from '@/utils/auth'
import { showModal } from '@/utils'
import to from '@/routes/to'
import { ROUTES_URL } from '@/routes'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
  }),
  getters: {
    getUserInfo(): UserInfo {
      const localUserInfo = Persistent.getLocal(USER_INFO_KEY)

      const result = this.userInfo || localUserInfo || {}

      return result
    },
    getToken(): string {
      return this.token || Persistent.getLocal(TOKEN_KEY)
    },
  },
  actions: {
    setToken(info?: string) {
      this.token = info ? info : '' // for null or undefined value
      Persistent.setLocal(TOKEN_KEY, info)
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      Persistent.setLocal(USER_INFO_KEY, info)
    },
    resetState() {
      this.setToken('')
      this.setUserInfo(null as any)
    },
    async login(params: LoginParams = {}): Promise<GetUserInfoModel | null> {
      const codeRes = await getAuthCode()
      params.code = codeRes || ''

      const { avatarUrl } = params

      try {
        if (
          avatarUrl &&
          (!isUrl(avatarUrl) || avatarUrl.includes('http://tmp'))
        ) {
          const fileRes = await uploadImgApi(avatarUrl)
          params.avatarUrl = fileRes.msg.pic
        }

        const data = await loginApi(params)
        const { token, uid } = data.msg

        // save token
        this.setToken(token)
        this.setUserInfo(data.msg)

        Persistent.setLocal(USER_ID_KEY, uid)

        return data.msg
      } catch (error) {
        return Promise.reject(error)
      }
    },

    logout() {
      this.resetState()

      toHome()
    },
    async cropAvatar(e) {
      let img_path = e.detail.avatarUrl

      return new Promise<string>((resolve) => {
        if (uni.cropImage) {
          uni.cropImage({
            src: img_path,
            cropScale: '1:1',
            success(res) {
              img_path = res.tempFilePath
              resolve(img_path)
            },
          })
        } else {
          wx.showModal({
            title: '提示',
            content:
              '当前微信版本过低，无法使用该裁剪功能，请升级到最新微信版本后重新修改。',
          })

          resolve(img_path)
        }
      })
    },
    /**
     * @param {string} _red 登录后重定向页面
     */
    async initUserStore(_red?: ROUTES_URL | string) {
      let redirectUrl = _red,
        currentRoute = getCurrentPages().slice(-1)?.[0]
      if (!redirectUrl) redirectUrl = '/' + (currentRoute?.route || '')
      if (redirectUrl == '/') redirectUrl = ROUTES_URL.HOME

      redirectUrl += queryParamsStr(currentRoute['options'])

      this.setUserInfo(Persistent.getLocal(USER_INFO_KEY))
      this.setToken(Persistent.getLocal(TOKEN_KEY))

      const { timeout = -1, uid, nickName, phone } = this.getUserInfo

      try {
        // 用户登录过期
        if (isNumber(+timeout) && +timeout != -1) {
          if (Date.now() > +timeout) {
            await showModal('提示', '用户登录状态已过期，请重新登录')(
              '去登录',
              null,
            )
            throw new Error()
          }
        }

        //  用户未进行登录
        if (!this.token || !uid || !nickName || !phone) {
          throw new Error()
        }

      } catch (error) {
        this.resetState()
        try {
          const res = await this.login()
          if (!res?.nickName) throw '该用户未注册'

          to({
            url: ROUTES_URL.TOP_SCREEN + queryParamsStr({ redirectUrl }),
            toType: 'reLaunch',
          })
        } catch (error) {
          toLogin(redirectUrl)
        }
      }
    },
  },
})

function toLogin(...arg) {}
function toHome(...arg) {}
