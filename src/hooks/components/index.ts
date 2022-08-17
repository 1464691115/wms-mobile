import { ComponentPublicInstanceConstructor, Ref, ref } from "vue";

/** 创建组件ref */
export function useCreateRef<C extends ComponentPublicInstanceConstructor>(component: C): Ref<InstanceType<typeof component>>
export function useCreateRef(): Ref<any>
export function useCreateRef(component?) {
    return ref()
}