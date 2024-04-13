<template>
  <view class="list-view">
    <slot
      v-if="!paginationList?.length && paginationList !== null"
      name="empty"
      :len="paginationList?.length || 0"
    />

    <slot
      v-if="
        paginationList ||
        paginationLoadMoreComProps.status == LoadMoreState.MORE
      "
      :list="(paginationList || []) as any"
      :buildId="buildId"
    />

    <slot
      v-if="isLoadMore"
      name="loadMore"
      :loadStatus="paginationLoadMoreComProps.status"
    >
      <uni-load-more v-bind="paginationLoadMoreComProps" />
    </slot>
  </view>
</template>

<script
  lang="ts"
  setup
  generic="A = never[], F = undefined, T = F extends undefined ? A : F"
>
import { onReachBottom } from '@dcloudio/uni-app'
import { nextTick, onMounted } from 'vue'
// @ts-ignore 高v3版本兼容
import { _defineSlots as defineSlots } from '@/utils/global/index'
import {
  PaginationLoadMoreComPropsType,
  PaginationMethodsType,
  LoadMoreState,
} from './props'
import { usePaginationFn } from './index'

interface propsType {
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

defineOptions({
  options: { styleIsolation: 'shared' },
})

onMounted(() => {
  props.onRegister?.(paginationMethods as any)

  nextTick(() => {
    paginationProps.value.immediate !== false && reloadPagination()
  })
})

const props = withDefaults(defineProps<propsType>(), {
  immediate: true,
  pageSize: 8,
})

defineSlots<{
  default(props: { list: Array<T>; buildId: string })
  empty(props: { len: number })
  loadMore(props: { loadStatus: PaginationLoadMoreComPropsType['status'] })
}>()

onReachBottom(async () => {
  !props.isCustomNext && reloadPagination()
})

const {
  buildId,
  paginationProps,
  paginationLoadMoreComProps,
  paginationList,
  isLoadMore,
  setScrollTop,
  setPaginationListState,
  setPaginationProps,
  resetPagination,
  reloadPagination,
} = usePaginationFn(props)

const paginationMethods = {
  paginationList,
  setScrollTop,
  setPaginationListState,
  setPaginationProps,
  reloadPagination,
  resetPagination,
}

defineExpose({
  ...paginationMethods,
})
</script>

<style lang="scss" scoped>
.list-view {
  padding-bottom: 40px;
  width: 100%;
  min-height: 100%;
}
</style>
