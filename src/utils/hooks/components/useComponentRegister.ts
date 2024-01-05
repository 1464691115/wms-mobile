import { Ref, nextTick, onUnmounted, unref } from 'vue'

/** 注册组件实例 */
export function useComponentRegister<M = any>(
  comRef: Ref<any>,
  registerCallback?: (methods: M) => void,
) {
  const asyncFn = [] as Array<(ins: M) => any>
  let isLoadCom = false

  /** 获取组件方法 并在组件加载完成后执行的回调方法 */
  async function getComponentAfterFn(fn?: (typeof asyncFn)[0]) {
    const self_component = unref(comRef)

    if (!isLoadCom) {
      fn && asyncFn?.push(fn)
    } else {
      fn?.(self_component)
    }

    await nextTick()

    return self_component as Exclude<typeof self_component, null>
  }

  function register(methods: M) {
    onUnmounted(() => {
      comRef.value = null
    })
    comRef.value = unref(methods)

    registerCallback && registerCallback?.(methods)

    isLoadCom = true

    asyncFn.forEach((el, _i) => {
      el?.(methods)
    })
    asyncFn.splice(0)
  }

  return {
    register,
    getComponentAfterFn,
  }
}
