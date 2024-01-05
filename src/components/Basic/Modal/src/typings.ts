import { ComputedRef } from 'vue'
import { BasePropsType } from './props'
/**
 * @description: 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setModalProps: (props: Partial<BasePropsType>) => void
  emitVisible?: (visible: boolean, uid: number) => void
}

export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void
  closeModal: () => void
  getVisible?: ComputedRef<boolean>
}
