import { ref, watch } from 'vue'
import _ from 'lodash-es'

type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

export function useComponentsProps<P extends Record<string, any>>(props: P) {
  const resultProps = ref({} as Mutable<P>)

  watch(
    () => props,
    () => {
      const selfProps = _.cloneDeep(props)
      const val = selfProps.customProps || {}
      for (const key in val) {
        if (Object.prototype.hasOwnProperty.call(val, key)) {
          const element = val[key]
          if (!selfProps[key]) {
            // @ts-ignore
            selfProps[key] = element
          }
        }
      }

      resultProps.value = selfProps as any
    },
    { deep: true, immediate: true },
  )

  return resultProps
}
