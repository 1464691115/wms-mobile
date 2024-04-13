export interface AxiosResponse<T = any>
  extends Omit<UniApp.RequestSuccessCallbackResult, 'data'> {
  data: T
}

export interface AxiosRequestConfig
  extends Partial<Omit<UniApp.RequestOptions, 'method'>> {
  /** 接口地址前缀 */
  baseUrl?: string
  method?: 'FILE' | UniApp.RequestOptions['method']

  //#region 只在 upload() 方法下有效
  filePath?: string
  /** 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容	默认是 file */
  name?: string
  fileKey?: string
  formData?: any
  // end
}

export interface CreateAxiosOptions {
  transform?: AxiosTransform
  requestOptions?: AxiosRequestConfig
}

abstract class AxiosTransform {
  /**
   * @description: 处理响应数据
   */
  transformResponseHook?: (
    res: AxiosResponse<Result>,
    options: AxiosRequestConfig,
  ) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (
    e: UniApp.GeneralCallbackResult,
    options: AxiosRequestConfig,
  ) => Promise<any>

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (options: AxiosRequestConfig) => AxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<Result>) => AxiosResponse<Result>
}

export const AxiosTransformConfig = (form: AxiosTransform) => form
