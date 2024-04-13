import { ref, watch } from 'vue'
import { useComponentRegister } from './useComponentRegister'
import { useProhibitScrollPenetrate } from '../web/useProhibitScrollPenetrate'
import { useRef } from './useRef'

interface PopupReturnMethods {
  openPopup(...arg): void
  closePopup(): void
}

/** uni-popup 弹框 开关hooks */
export function usePopup(): [typeof register, PopupReturnMethods] {
  const popupRef = ref<any>(null)

  const { register, getComponentAfterFn } = useComponentRegister(popupRef)

  return [
    register,
    {
      openPopup(...arg) {
        getComponentAfterFn((ins) => ins.openPopup?.(...arg))
      },

      closePopup() {
        console.log(111)

        getComponentAfterFn((ins) => ins.closePopup?.())
      },
    },
  ]
}

/** uni-popup 弹框页面操作 */
export function usePopupInner(
  openCallback,
): [typeof setPopupRef, typeof methods] {
  const [setPopupRef, popupRef] = useRef()
  const { openProhibit, closeProhibit } = useProhibitScrollPenetrate()

  const isShowPopup = ref(false)

  watch(isShowPopup, (v, ov) =>
    v && ov !== v ? methods.openPopup() : methods.closePopup(),
  )

  const methods = {
    openPopup(...arg: any) {
      openCallback && arg.length && openCallback(...arg)

      popupRef.value.open?.()
      //TODO kesen: 2023-06-15  打开页面禁止滚动
      openProhibit()
    },
    closePopup() {
      popupRef.value.close?.()
      //TODO kesen: 2023-06-15  关闭页面禁止滚动
      closeProhibit()
    },
    setPopupState(state: boolean) {
      isShowPopup.value = state
    },
  }

  return [setPopupRef, methods]
}
