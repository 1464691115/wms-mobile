import { getCurrentInstance } from 'vue'

/** 在setup中获取当前实例 */
export function useInstance() {
  const internalInstance = getCurrentInstance()

  const result = internalInstance?.appContext.config.globalProperties

  return result || ({} as unknown as NonNullable<typeof result>)
}
