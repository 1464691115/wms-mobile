import { getDynamicProps } from '@/utils'
import { nextTick, onUnmounted, ref, unref, watch } from 'vue'
import { BaseFormPropsType } from '../props'
import { BasicForm } from '../types'
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends
    | string
    | boolean
    | number
    | undefined
    | null
    ? T[K]
    : DeepReadonly<T[K]>
}

type PropsDeepReadonly = DeepReadonly<Partial<BaseFormPropsType>>
/**
 * @tips 想要schema的类型提示的话请在 参数后面加上 as const 例如  useForm({} as const)
 */
export function useForm<P extends PropsDeepReadonly>(
  props?: P | PropsDeepReadonly,
): [typeof register, BasicForm.FormMethodsType<P>] {
  const formRef = ref<any>(null)

  async function getForm() {
    const form = unref(formRef)

    if (!form) {
      console.error('尚未获取表单实例，请确保在执行表单操作时表单已加载')
    }

    await nextTick()

    return form as Exclude<typeof form, null>
  }

  function register(methods) {
    onUnmounted(() => {
      formRef.value = null
    })
    formRef.value = unref(methods)

    watch(
      () => props,
      () => {
        props && methods.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true,
      },
    )
  }

  const methods = {
    setProps: async (formProps: Partial<BaseFormPropsType>) => {
      const form = await getForm()
      form.setProps(formProps)
    },

    getProps: () => {
      return unref(formRef)?.getProps()
    },

    updateSchema: async (
      data: Partial<BasicForm.FormSchema> | Partial<BasicForm.FormSchema>[],
    ) => {
      const form = await getForm()
      form.updateSchema(data)
    },

    resetSchema: async (
      data: Partial<BasicForm.FormSchema> | Partial<BasicForm.FormSchema>[],
    ) => {
      const form = await getForm()
      form.resetSchema(data)
    },

    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields()
      })
    },

    removeSchemaByFiled: async (field) => {
      unref(formRef)?.removeSchemaByFiled(field as any)
    },

    // TODO promisify
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T
    },

    setFieldsValue: async (values) => {
      const form = await getForm()
      form.setFieldsValue(values as any)
    },

    appendSchemaByField: async (
      schema: BasicForm.FormSchema,
      prefixField?: string,
      first?: boolean,
    ) => {
      const form = await getForm()
      form.appendSchemaByField(schema, prefixField, first)
    },

    submit: async (): Promise<any> => {
      const form = await getForm()
      return form.submit()
    },
  }

  return [register, methods]
}
