import { AxiosTransformConfig } from './axiosTransform'
import { ResultEnum } from '@/enums/httpEnum'
import { getToken } from '@/utils/auth'
import { Persistent } from '@/utils/cache/persistent'
import { USER_ID_KEY } from '@/enums/cacheEnum'
import { VAxios } from './Axios'
import { isString } from '@/utils/is'
import { getAppEnvConfig } from '@/utils/env'
import { showToast } from '@/utils/lib/s-view'
import { UserApi } from '@/service/sys/ApiEnum'
import { initStore } from '@/store'
import { useUserStore } from '@/store/modules/user'
import { UploadApi } from '@/service/sys/upload'

const whiteApiUrl: string[] = [UserApi.LOGIN, UploadApi.UPLOAD_IMG]

/** 是否正在处理401问题，如果是，跳过其他重新登录 */
let handle_401__ing = false

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform = AxiosTransformConfig({
  /**
   * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
   */
  transformResponseHook: (res, opt) => {
    const { resetState: userResetState } = useUserStore()
    const data = typeof res.data == 'string' ? JSON.parse(res.data) : res.data

    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { returnCode, code, data: _data, msg } = data

    // 这里逻辑可以根据项目进行修改
    if (returnCode) {
      const hasSuccess =
        data &&
        Reflect.has(data, 'returnCode') &&
        [ResultEnum.SUCCESS].includes(returnCode)
      if (hasSuccess) return data
    }

    console.log(`----------------------------------------------`)
    console.log(`_________________ ${opt.url} _________________`)
    console.table(opt)
    console.table(data)
    console.log(`_________________ end _________________`)
    console.log(`----------------------------------------------`)

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = JSON.stringify(opt)
    switch (code) {
      case ResultEnum.FAIL:
        timeoutMsg = _data
        break
      case ResultEnum.BAD:
        timeoutMsg = msg
        break
      case ResultEnum.AUTH:
        if (!handle_401__ing) {
          handle_401__ing = true
          userResetState()
          initStore().finally(() => {
            handle_401__ing = false
          })
        }
        timeoutMsg = _data
        break
      default:
        if (msg) timeoutMsg = msg
    }

    throw timeoutMsg
  },
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (options) => {
    const { baseUrl } = options
    const { VITE_GLOB_API_URL } = getAppEnvConfig()

    // 请求之前处理config
    const token = getToken()
    const uid = Persistent.getLocal(USER_ID_KEY)

    if (!options.header) options.header = {}
    try {
      // 有请求地址并且不在白名单中
      if (options.url && !whiteApiUrl.some((el) => options.url?.includes(el))) {
        if (!token) throw '用户信息已失效，请重新登录'
        if (!uid) throw '请登录注册后使用'
      }

      // jwt token
      options.header['Accept-LemonpieToken'] = token
      options.header['Accept-LemonpieUid'] = uid
    } catch (error) {
      if (!handle_401__ing) {
        handle_401__ing = true
        showToast(typeof error === 'string' ? error : '登录失效').then(
          async () => {
            initStore().finally(() => {
              handle_401__ing = false
            })
          },
        )
      }

      throw error
    }

    // 处理接口地址公共前缀
    if (baseUrl && isString(baseUrl)) {
      options.url = `${baseUrl}${options.url}`
    }
    options.url = VITE_GLOB_API_URL + options.url

    if (!options.header) options.header = {}

    return options
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res) => {
    return res
  },

  /**
   * @description: 请求失败处理
   */
  requestCatchHook: (e) => {
    const msg: string = e.errMsg || ''

    throw new Error(msg as unknown as string)
  },
})

export const defHttp = new VAxios({
  transform,
  requestOptions: {
    url: '',
    baseUrl: '/api',
    timeout: 60000,
    method: 'GET',
  },
})
