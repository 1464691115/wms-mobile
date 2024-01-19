<template>
  <view class="basic-form" @click.stop="() => {}">
    <view
      class="basic-form-content"
      :style="{
        gridTemplateColumns: 'repeat(24, 1fr)',
        gap: (formProps.gutter || [0, 0]).map((el) => Px(el)).join(' '),
      }"
    >
      <view
        v-if="formProps.formTitle || $slots.formHeader"
        class="basic-form-content_title"
      >
        <slot name="formHeader" :formData="formData">
          <text :style="{ fontSize: Px(40) }">
            {{ formProps.formTitle || '' }}
          </text>
        </slot>
      </view>

      <template
        v-for="(item, index) in formProps.schemas || []"
        :key="item.field"
      >
        <view
          v-if="
            schemaOrFn(item.ifShow, {
              schema: item,
              values: formData,
              model: formData[item.field],
              field: item.field,
            })
          "
          class="form-item"
          :class="{ 'form-item-required': item.required === true }"
          :style="{
            gridColumnEnd: `span ${formFormItemSpan[index]}`,
            ...getFormLayoutStyle,
            ...(item.rowStyle || formProps.baseRowStyle || {}),
          }"
        >
          <view
            class="label"
            :style="{
              width: Px(item.labelWidth || formProps.labelWidth || '100%'),
              minWidth: Px(item.labelWidth || formProps.labelWidth),
              textAlign: item.labelAlign || formProps.labelAlign || 'left',
            }"
          >
            {{ filterLabel(item.label, item) }}
            {{ filterColon(item.colon || formProps.colon) }}
          </view>
          <view class="flex-1">
            <BasicInput
              v-if="item.component == ComponentOptions.Input"
              v-model="formData[item.field]"
              :placeholder="
                item.componentProps?.placeholder ||
                `请填写${filterLabel(item.label, item)}`
              "
              input-border
              :custom-props="readComponentPropsItem(item) || {}"
            />

            <uni-easyinput
              v-if="item.component == ComponentOptions.InputNumber"
              v-model="formData[item.field]"
              type="number"
              :placeholder="
                item.componentProps?.placeholder ||
                `请填写${filterLabel(item.label, item)}`
              "
              input-border
              :custom-props="readComponentPropsItem(item) || {}"
            />

            <uni-easyinput
              v-else-if="item.component == ComponentOptions.Textarea"
              v-model="formData[item.field]"
              type="textarea"
              :maxlength="item.componentProps?.maxlength || -1"
              :placeholder="
                item.componentProps?.placeholder ||
                `请填写${filterLabel(item.label, item)}`
              "
              :auto-height="item.componentProps?.autoHeight"
            />

            <uni-data-checkbox
              v-else-if="item.component == ComponentOptions.GroupRadio"
              v-bind="readComponentPropsItem(item)"
              v-model="formData[item.field]"
            />

            <uni-datetime-picker
              v-else-if="item.component == ComponentOptions.DateTime"
              v-bind="readComponentPropsItem(item)"
              :value="formData[item.field]"
              rangeSeparator="~"
              @change="
                (e) => (formData[item.field] = isArray(e) ? e.join('~') : e)
              "
            />
          </view>
        </view>
      </template>
    </view>

    <slot
      v-if="formProps.showActionButtonGroup"
      name="formFooter"
      :formData="formData"
    >
      <view class="basic-form-btns flex-row">
        <BasicButton
          v-if="formProps.showResetButton === true"
          class="btn-text"
          :custom-props="{
            text: '重 置',
            shape: 'square',
            ...(formProps.resetButtonOptions || {}),
          }"
          @tap.stop="btnHandleReset"
        />
        <BasicButton
          v-if="formProps.showSubmitButton === true"
          class="btn-text"
          :custom-props="{
            text: '提 交',
            shape: 'square',
            type: 'primary',
            ...(formProps.submitButtonOptions || {}),
          }"
          @tap.stop="btnHandleSubmit"
        />
      </view>
    </slot>
  </view>
</template>
<script lang="ts" setup>
import {
  computed,
  CSSProperties,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import {
  filterComponentsProps,
  filterLabel,
  filterColon,
  schemaOrFn,
} from './filter'
import { BasicForm, ComponentOptions } from './types'
import { baseFormProps, BaseFormPropsType } from './props'
import {
  createArray,
  deepClone,
  funcForIn,
  showToast,
} from '@/utils/lib/s-view'
import BasicInput from '../../Input/src/BasicInput.vue'
import BasicButton from '../../Button/src/BasicButton.vue'
import { isArray, isFunction, isObject, isString } from '@/utils/is'
import { APP_PRESET_COLOR } from '@/settings/designSetting'

onMounted(async () => {
  emits('register', formMethods)
})

const props = defineProps(baseFormProps)
const emits = defineEmits<{
  (e: 'register', methods: BasicForm.FormMethodsType): Promise<any>
}>()

const formData = ref({})
const formProps = reactive({} as BaseFormPropsType)

/** 获取当前 item所占的行 */
const formFormItemSpan = computed(() => {
  if (!formProps.schemas)
    return createArray(formProps.baseColProps?.span || 4, 12)

  return formProps.schemas.map((el) => {
    return el.colProps?.span || formProps.baseColProps?.span || 12
  })
})

/** 获取当前 表单的布局样式 */
const getFormLayoutStyle = computed<CSSProperties>(() => {
  const layout = formProps.layout
  switch (layout) {
    case 'vertical':
      return {}

    case 'horizontal':
    default:
      return {
        display: 'flex',
        alignItems: 'center',
      }
  }
})

watch(
  () => props,
  (val) => {
    funcForIn(val, formProps)
    if (formProps.schemas) {
      formProps.schemas = filterComponentsProps(formProps.schemas, {
        schema: formProps.schemas,
        formActionType: formMethods,
        formModal: formData.value,
      })
    }
  },
  { immediate: true },
)

/** 重置表单 */
function btnHandleReset() {
  if (formProps.resetFunc !== undefined) {
    formProps.resetFunc()
  } else {
    resetFields()
  }
}
/** 提交表单 */
async function btnHandleSubmit() {
  await validate()

  handleSubmit()
}

const getFieldsValue: BasicForm.FormMethodsType['getFieldsValue'] = () => {
  return formData.value
}

const setFieldsValue: BasicForm.FormMethodsType['setFieldsValue'] = (
  values = {},
) => {
  return new Promise((resolve) => {
    funcForIn(values, formData.value)
    nextTick(() => resolve(true))
  })
}

const resetFields: BasicForm.FormMethodsType['resetFields'] = () => {
  return new Promise(async (resolve) => {
    formData.value = {}
    nextTick(() => resolve(true))
  })
}

const handleSubmit: BasicForm.FormMethodsType['submit'] = () => {
  return new Promise(async (resolve, reject) => {
    if (formProps.submitFunc !== undefined) {
      formProps.submitFunc().finally(() => resolve(true))
    } else {
      try {
        await formProps.submitApiFunc?.(formData)
        await showToast('操作成功')
        resolve(true)
      } catch (error) {
        typeof error == 'string'
          ? await showToast(error || '操作失败')
          : console.error(error)
        reject(error)
      }
    }
  })
}

const setProps: BasicForm.FormMethodsType['setProps'] = (_formProps) => {
  return new Promise(async (resolve) => {
    funcForIn(_formProps, formProps)
    formProps.schemas = filterComponentsProps(formProps.schemas, {
      schema: formProps.schemas,
      formActionType: formMethods,
      formModal: formData.value,
    })
    nextTick(() => resolve(true))
  })
}

const getProps: BasicForm.FormMethodsType['getProps'] = () => {
  return formProps
}

const removeSchemaByFiled: BasicForm.FormMethodsType['removeSchemaByFiled'] = (
  field,
) => {
  return new Promise(async (resolve) => {
    let array = Array.isArray(field) ? field : new Array(field)
    formProps.schemas = formProps.schemas?.filter((el) => {
      if (array.includes(el.field)) {
        array = array.filter((a_el) => a_el !== el.field)
        return false
      }
      return true
    })

    nextTick(() => resolve(true))
  })
}

const appendSchemaByField: BasicForm.FormMethodsType['appendSchemaByField'] = (
  schema,
  prefixField,
  first,
) => {
  return new Promise(async (resolve) => {
    const prefixIndex =
      formProps.schemas?.findIndex((s_el) => s_el.field == prefixField) || -1

    if (!formProps.schemas) {
      resolve(false)
      return
    }

    const operate = first ? formProps.schemas.length - 1 : 0
    formProps.schemas?.splice(
      !prefixField || prefixIndex == -1 ? operate : prefixIndex,
      0,
      schema,
    )

    nextTick(() => resolve(true))
  })
}

const updateSchema: BasicForm.FormMethodsType['updateSchema'] = (data) => {
  return new Promise(async (resolve) => {
    const array = Array.isArray(data) ? data : new Array(data)

    if (!formProps.schemas) {
      resolve(false)
      return
    }

    array.forEach((item) => {
      formProps.schemas?.forEach((val) => {
        if (val.field === item.field) {
          val = item as BasicForm.FormSchema
        }
      })
    })

    nextTick(() => resolve(true))
  })
}

const resetSchema: BasicForm.FormMethodsType['resetSchema'] = (data) => {
  return new Promise(async (resolve) => {
    const array = Array.isArray(data) ? data : new Array(data)
    formProps.schemas = array as unknown as BasicForm.FormSchema[]
    nextTick(() => resolve(true))
  })
}

const validate: BasicForm.FormMethodsType['validate'] = () => {
  return new Promise((resolve, rej) => {
    const formData = formMethods.getFieldsValue()
    try {
      const self_props = formMethods.getProps()
      const self_params = self_props.schemas?.map((el) => {
        if (!formData[el.field] && el.required) {
          const msg = `请填写${el.label}`
          throw msg
        } else if (
          el.rule &&
          isString(formData[el.field]) &&
          !RegExp(escapeRegExp(el.rule)).test(formData[el.field])
        ) {
          const msg = el.ruleMsg || `${el.label}格式有误，请检查`
          throw msg
        }
        return { title: el.field, value: formData[el.field] || null }
      })

      if (!self_params) rej()
      else resolve(self_params)
    } catch (error) {
      console.error(error)
      if (isString(error)) {
        showToast(error)
        rej(error)
      }
    }
  })
  function escapeRegExp(string) {
    return string.replace(/\\{2}(\w)/g, '\\$1')
    //$&表示整个被匹配的字符串
  }
}

function readComponentPropsItem(item) {
  const { component = '', componentProps = {} } = deepClone(item)

  if (!componentProps) return {}
  if (!component) item.component = ComponentOptions.Input

  switch (component) {
    case ComponentOptions.GroupRadio:
      componentProps.localdata = (componentProps.localdata || []).map((el) =>
        !isObject(el) ? { text: el, value: el } : el,
      )
      componentProps.selectedColor =
        componentProps.selectedColor ?? APP_PRESET_COLOR
      break
    case ComponentOptions.DateTime:
      break
    case ComponentOptions.Input:
    default:
      break
  }

  return isFunction(componentProps)
    ? componentProps({
        formModel: formData,
        formActionType: formMethods,
        schema: item,
      })
    : componentProps
}

const formMethods: BasicForm.FormMethodsType = {
  getFieldsValue,
  setFieldsValue,
  resetFields,
  submit: handleSubmit,
  validate,
  setProps,
  getProps,
  removeSchemaByFiled,
  appendSchemaByField,
  updateSchema,
  resetSchema,
}

defineExpose({
  ...formMethods,
  formData,
})
</script>
<style lang="scss" scoped>
::v-deep .basic-form-btns {
  margin-top: 20px;
  width: 100%;

  .btn-text {
    @include flex-center;
    height: 80rpx;
    padding: 20rpx 0;
    flex: 1;
    font-size: 34rpx;
  }
}

.basic-form {
  width: 100%;
  height: auto;

  .basic-form-content {
    min-height: 100rpx;

    display: grid;

    font-size: 32rpx;

    .basic-form-content_title {
      @include font(40rpx, 50rpx, #525252, 600);
      margin-bottom: 12px;
      grid-column: 1/-1;
    }

    .form-item {
      margin-bottom: 20rpx;
      width: 100%;

      &:last-child {
        margin-bottom: 0rpx;
      }

      .label {
        @include font(32rpx, 40px, #333, 400);
        white-space: nowrap;
      }
    }

    .form-item-required {
      .label {
        &::before {
          content: '*';
          color: rgb(207, 52, 52);
        }
      }
    }
  }
}
</style>
