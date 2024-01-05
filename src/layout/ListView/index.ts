import { useComponentsProps } from '@/components/Basic/hooks/useComponentsProps'
import { deepMerge, getDynamicProps } from '@/utils'
import { useComponentRegister } from '@/utils/hooks/components/useComponentRegister'
import { buildUUID } from '@/utils/uuid'
import { toReactive } from '@vueuse/core'
import { isArray, isNull } from 'lodash-es'
import {
  computed,
  nextTick,
  reactive,
  Ref,
  ref,
  toRaw,
  unref,
  watch,
} from 'vue'
import {
  LoadMoreState,
  PaginationDefProps,
  PaginationLoadMoreComPropsType,
  PaginationMethodsType,
  PaginationPropsType,
  PaginationType,
  propsType,
} from './props'

export function usePagination<A_ITEM = never[], F_ITEM = undefined>(
  props?: Partial<PaginationPropsType<A_ITEM, F_ITEM>>,
) {
  type paginationItemType = F_ITEM extends undefined ? A_ITEM : F_ITEM

  const paginationRef = ref(null as unknown as Ref<any>)

  const { register, getComponentAfterFn } = useComponentRegister<
    PaginationMethodsType<paginationItemType>
  >(paginationRef, (met) => {
    watch(
      () => props,
      () => {
        props && met.setPaginationProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true,
      },
    )
  })

  const methods = {
    paginationList: computed(() => {
      return unref(unref(paginationRef)?.paginationList)
    }),
    getPaginationList: () => {
      return unref(paginationRef)?.paginationList
    },
    setPaginationListState: (state) => {
      getComponentAfterFn((pageIns) => pageIns.setPaginationListState(state))
    },
    setScrollTop: (y) => {
      getComponentAfterFn((pageIns) => pageIns.setScrollTop(y))
    },
    setPaginationProps: (paginationProps) => {
      getComponentAfterFn((pageIns) =>
        pageIns.setPaginationProps(paginationProps),
      )
    },

    resetPagination: () => {
      getComponentAfterFn((pageIns) => pageIns.resetPagination())
    },
    reloadPagination: () =>
      new Promise((res) => {
        getComponentAfterFn(async (pageIns) => {
          await pageIns.reloadPagination()
          res({})
        })
      }),
  }

  return [register, toReactive(methods)] as [
    typeof register,
    PaginationMethodsType<paginationItemType>,
  ]
}

/** 只做独立请求函数使用，不合组件关联 */
export function usePaginationFn<
  A = never[],
  F = undefined,
  T = F extends undefined ? A : F,
>(props: propsType<A, F>) {
  const paginationProps = useComponentsProps(props)

  const historyScrollTop = ref()
  /** 每次重置列表后的 uuid */
  const buildId = ref()

  const paginationParams = reactive<PaginationType>({
    page: 1,
    count: props.pageSize,
    total_page: 0,
    total_count: 0,
  })

  const paginationLoadMoreComProps = reactive<PaginationLoadMoreComPropsType>({
    iconSize: 16,
    status: LoadMoreState.MORE,
    iconType: 'circle',
    contentText: {
      contentdown: '上拉显示更多',
      contentrefresh: '正在加载...',
      contentnomore: '没有更多数据了',
    },
  })

  const paginationList = ref(null as any) as Ref<T[] | undefined>

  const isLoadMore = computed(() => paginationList.value?.length != 0)
  const requestParams = computed(() => {
    const { params } = toRaw(paginationProps.value)

    return {
      ...(paginationParams || {}),
      ...(unref(params) || {}),
    }
  })

  function setPaginationLoadMoreState(
    state: Partial<PaginationLoadMoreComPropsType>,
  ) {
    deepMerge(paginationLoadMoreComProps, state)
  }

  function setScrollTop(y) {
    historyScrollTop.value = y
  }

  function setPaginationListState(state = [] as T[]) {
    if (!isArray(state) && !isNull(state)) return
    paginationList.value = state
  }

  function setPaginationProps(
    _props: Partial<Record<keyof PaginationDefProps<A>, any>>,
  ) {
    paginationProps.value = { ...paginationProps.value, ..._props }
  }

  function setPaginationParamsState(state: Partial<PaginationType>) {
    Object.assign(paginationParams, state)
  }

  function resetPagination() {
    buildId.value = buildUUID()

    setPaginationListState(null as any)

    const { pageSize = 0, isPersist } = toRaw(paginationProps.value)
    const { page = 0 } = toRaw(paginationParams)

    /** 持久化当前页的参数 */
    if (isPersist) {
      setPaginationParamsState({
        page: 1,
        count: page > 1 ? pageSize * (page - 1) : pageSize,
      })
    } else {
      setPaginationParamsState({
        page: 1,
      })
    }

    setPaginationLoadMoreState({
      status: LoadMoreState.MORE,
    })
  }

  async function reloadPagination() {
    const {
      api,
      responseFilter,
      pageSize = 0,
      isPersist,
    } = toRaw(paginationProps.value)
    const { count = 0 } = toRaw(paginationParams)

    if (api) {
      switch (paginationLoadMoreComProps.status) {
        case LoadMoreState.NO_MORE:
          return console.log('到底了')
        case LoadMoreState.LOADING:
          return console.log('正在加载中')
      }

      setPaginationLoadMoreState({ status: LoadMoreState.LOADING })

      await nextTick()

      try {
        const res = await api(toRaw(requestParams.value))

        // 重置错误信息
        setPaginationLoadMoreState({
          contentText: {
            ...(paginationLoadMoreComProps.contentText || {}),
            contentnomore: '没有更多数据了',
          },
        })

        const { page, total_page, total_count, list } = res.msg

        const old_arr = paginationList.value || []

        const _arr = old_arr.concat((responseFilter?.(list) as any) || list)

        setPaginationParamsState({
          total_count,
          total_page,
        })

        setPaginationListState(_arr)

        //TODO kesen: 2023-07-15  记录当前位置
        const self_scrollTop = toRaw(historyScrollTop.value)

        if (page >= total_page || list.length < count) {
          setPaginationLoadMoreState({ status: LoadMoreState.NO_MORE })
        } else {
          setPaginationLoadMoreState({ status: LoadMoreState.MORE })
        }

        if (isPersist) {
          //TODO kesen: 2023-07-15  重置 保留上次记录 第一次请求
          if (count !== pageSize) {
            setPaginationParamsState({
              page: Math.ceil(count / pageSize) + 1,
              count: pageSize,
            })

            if (page < total_page && count < total_count) {
              setPaginationLoadMoreState({ status: LoadMoreState.MORE })
            }

            nextTick(() => {
              console.log(self_scrollTop)
              uni.pageScrollTo({ scrollTop: self_scrollTop, duration: 0 })
            })
          } else {
            setPaginationParamsState({
              page: page + 1,
              count: count,
            })
          }
        } else {
          setPaginationParamsState({
            page: page + 1,
          })
        }
      } catch (error) {
        console.log(error)

        setPaginationLoadMoreState({
          status: LoadMoreState.NO_MORE,
          contentText: {
            ...paginationLoadMoreComProps.contentText,
            contentnomore:
              typeof error == 'string' ? error || '获取失败' : '没有更多数据了',
          },
        })
      }
    } else {
      console.warn('api 必传')
    }
  }

  return {
    buildId,
    paginationProps,
    historyScrollTop,
    paginationParams,
    paginationLoadMoreComProps,
    paginationList,
    isLoadMore,
    requestParams,
    setPaginationLoadMoreState,
    setScrollTop,
    setPaginationListState,
    setPaginationProps,
    setPaginationParamsState,
    resetPagination,
    reloadPagination,
  }
}
