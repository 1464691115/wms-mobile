import {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosOptions,
} from './axiosTransform'
import { isFunction } from '@/utils/is'

export class VAxios {
  protected readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  uploadFile<T = any>(config: AxiosRequestConfig) {
    config.name = config.fileKey || 'file'
    config.formData = config.data
    return this.request<T>({ ...config, method: 'FILE' })
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  request<P>(options: AxiosRequestConfig) {
    const { requestOptions = {} } = this.options || {}

    let opt = Object.assign({}, requestOptions, options) as any
    const transform = this.getTransform()
    const { requestInterceptors, requestCatchHook, transformResponseHook } =
      transform || {}

    if (requestInterceptors && isFunction(requestInterceptors)) {
      opt = requestInterceptors(opt)
    }

    return new Promise<Result<P>>((resolve, reject) => {
      let requestFn = uni.request
      if (opt.method == 'FILE') {
        requestFn = uni.uploadFile as any
      }

      requestFn({
        ...opt,
        success: async (result) => {
          const res = result as AxiosResponse
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error(opt))
            }
          }
        },
        fail: (e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          reject(e)
        },
      })
    })
  }
}
