import { isProdMode } from '@/utils/env'
import {
  getCurrentInstance,
  onUnmounted,
  ref,
  reactive,
  unref,
  toRaw,
  computed,
  nextTick,
  watchEffect,
} from 'vue'
import { ModalMethods, ReturnMethods } from '../typings'
import { isEqual, isFunction } from 'lodash-es'
import { BasePropsType } from '../props'
import { tryOnUnmounted } from '@vueuse/core'

const dataTransfer = reactive<any>({})

const visibleData = reactive({})

export function useModal(props?: Partial<BasePropsType>) {
  const modal = ref<Nullable<ModalMethods>>()
  const loaded = ref(false)
  const uid = ref('')

  function register(modalMethod: ModalMethods, uuid?) {
    if (!getCurrentInstance()) {
      throw new Error('useModal() 请在 setup 中执行')
    }

    uid.value = uuid

    isProdMode() &&
      onUnmounted(() => {
        modal.value = null
        loaded.value = false
        dataTransfer[unref(uid)] = null
      })

    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return

    modal.value = modalMethod
    loaded.value = true

    modalMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible
    }

    getInstance()?.setModalProps(props || {})
  }

  const getInstance = () => {
    const instance = unref(modal)
    if (!instance) {
      console.error('useModal instance is undefined!')
    }
    return instance
  }

  const methods: ReturnMethods = {
    setModalProps: (props: Partial<BasePropsType>): void => {
      getInstance()?.setModalProps(props)
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),

    openModal: <T = any>(
      visible = true,
      data: T = {} as T,
      openOnSet = true,
    ): void => {
      getInstance()?.setModalProps({
        show: false,
      })
      getInstance()?.setModalProps({
        show: !!visible,
      })

      if (!data) return
      const id = unref(uid)
      if (openOnSet) {
        dataTransfer[id] = null
        dataTransfer[id] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data))
      if (!equal) {
        dataTransfer[id] = toRaw(data)
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ show: false })
    },
  }
  return [register, methods] as const
}

/** 弹框内部打开触发回调，需要 openModal 第二个参数有值 */
export const useModalInner = (callbackFn?: Fn) => {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<string>('')

  const getInstance = () => {
    const instance = unref(modalInstanceRef)
    if (!instance) {
      console.error('useModalInner instance is undefined!')
    }
    return instance
  }

  const register = (modalInstance: ModalMethods, uuid: string) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        modalInstanceRef.value = null
      })
    uidRef.value = uuid
    modalInstanceRef.value = modalInstance
    currentInstance?.emit('register', modalInstance, uuid)
  }

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)]
    if (!data) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data)
    })
  })

  return [
    register,
    {
      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)]
      }),

      closeModal: () => {
        getInstance()?.setModalProps({ show: false })
      },
      openModal: () => {
        getInstance()?.setModalProps({ show: true })
      },

      setModalProps: (props: Partial<BasePropsType>) => {
        getInstance()?.setModalProps(props)
      },
    },
  ] as const
}
