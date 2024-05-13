import { getDynamicProps } from '@/utils'
import { nextTick, ref, unref, watch } from 'vue'
import { BaseFormPropsType } from '../props'
import { BasicForm } from '../types'
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends
  | string
  | boolean
  | number
  | undefined
  | null
  | Function
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

  const tasksList = [] as any[]

  async function getForm(this: any) {
    const that = this
    await nextTick()

    const form = unref(formRef)

    if (!form) {
      console.error('尚未获取表单实例，操作将在表单初始化后按先入后出顺序执行')

      return Object.keys(methods).reduce((pre, cur) => {
        pre[cur] = function (...arg) {
          tasksList.push(methods[cur].bind(that, ...arg))
        }
        return pre
      }, {})
    }

    return form as Exclude<typeof form, null>
  }

  function register(methods) {
    formRef.value = unref(methods)

    nextTick().then(async () => {
      for (let i = tasksList.length - 1; i >= 0; i--) {
        const element = tasksList[i]
        await element()
        tasksList.splice(i, 1)
      }
    })

    watch(
      () => props,
      () => {
        if (props) {
          methods.setProps(getDynamicProps(props))
        }
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

      if (formProps.schemas) {
        form.setFieldsValue(
          formProps.schemas.reduce((pre, el) => {
            const self_data = form.getFieldsValue()
            if (el.defaultValue && !self_data[el.field]) {
              pre[el.field] = el.defaultValue
            }
            return pre
          }, {}),
        )
      }
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

    validate: async (): Promise<any> => {
      const form = await getForm()
      return form.validate()
    },
  }

  return [register, methods]
}
