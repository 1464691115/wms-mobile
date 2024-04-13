/** 请求返回类型 */
declare interface Result<T = string> {
  returnCode: import('@/enums/httpEnum').ResultEnum
  msg: T
  data?: T
}

/** 列表请求参数 */
declare interface ArrayRequestParam {
  count: ArrayRequestResult['data']['count']
  page: ArrayRequestResult['data']['page']
}

/** 列表分页返回接口 */
declare type ArrayRequestResult<T = any> = {
  /** 每页数量 */
  count: number
  list: T[]
  /** 当前页 */
  page: number
  /** 总条数 */
  total_count: number
  /** 总页数 */
  total_page: number
}

declare type GlobalRequestType = Result | ArrayRequestResult

/** 获取 Promise 的类型 */
declare type ReturnPromise<T extends Promise<any>> = Parameters<
  Parameters<T['then']>['0']
>['0']

declare type BaseOptions = { id: number; value: string }

declare type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

// multipart/form-data: upload file
declare interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file?: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
