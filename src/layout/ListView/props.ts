import { ComputedRef } from 'vue'

export enum LoadMoreState {
  MORE = 'more',
  LOADING = 'loading',
  NO_MORE = 'noMore',
}
export interface PaginationLoadMoreComPropsType {
  status: LoadMoreState
  iconType: 'snow' | 'circle' | 'auto'
  iconSize: number
  contentText: {
    contentdown: string
    contentrefresh: string
    contentnomore: string
  }
}

export interface propsType<A, F> {
  /** 是否自定义 下一页方法 */
  isCustomNext?: boolean
  /** 是否保留上次记录 */
  isPersist?: boolean
  /** 每页个数 (paginationParams) pageSize  */
  pageSize?: number
  /** 请求额外携带参数 */
  params?: object
  /** 是否立即请求 */
  immediate?: boolean
  /** 列表请求的接口，接口返回需要是 {msg:{list:[]}} 格式 */
  api?: (...arg) => Promise<Result<ArrayRequestResult<A>>>
  /** 接口请求后过滤数据格式 */
  responseFilter?: (record: any[]) => F[]
  /** 注册事件 */
  onRegister?: (
    methods: PaginationMethodsType<A extends never[] ? A : any>,
  ) => void
}

export interface PaginationType extends Partial<ArrayRequestResult> {}

export type PaginationPropsType<
  A = never[],
  F = undefined,
> = PaginationDefProps<A, F>

export interface PaginationMethodsType<T = never> {
  /**
   * 获得列表数据，不可进行写入操作
   * 如要操作请使用 setPaginationListState 重新赋值或者 getPaginationList进行操作
   * */
  paginationList?: ComputedRef<T[]>
  /** 获得列表数据，为响应数据可操作 */
  getPaginationList: () => T[]
  setPaginationListState: (state) => void
  setScrollTop: (y: number) => void
  setPaginationProps: (
    _BasePropsType: Partial<PaginationPropsType<any>>,
  ) => void
  resetPagination: () => void
  reloadPagination: () => Promise<any>
}

export interface PaginationDefProps<A = never[], F = undefined> {
  /** 请求额外携带参数 */
  params: object
  /** 是否立即请求 */
  immediate: boolean
  /** 列表请求的接口，接口返回需要是 {msg:{list:[]}} 格式 */
  api: (...arg) => Promise<Result<ArrayRequestResult<A>>>
  /** 接口请求后过滤数据格式 */
  responseFilter: (record: A[]) => F[]
}
