import { Ref, ref, VNodeRef } from 'vue'

/** 获取组件ref */
export function useRef<T = any>(): [VNodeRef, Ref<T>] {
  const com_ref = ref()

  function setRef(el) {
    if (!el) return
    com_ref.value = el
  }

  return [setRef, com_ref]
}
