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
            v-if="item.label"
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
          <view
            class="flex-1 input"
            :class="{
              bordered:
                readComponentPropsItem(item)?.bordered ?? formProps.bordered,
              disabled: readComponentPropsItem(item)?.disabled,
            }"
          >
            <!-- 小程序那边 不能用参数，暂时在使用处用 getFieldsValue -->
            <slot v-if="item.slot" :name="item.slot" />
            <BasicInput
              v-else-if="item.component == ComponentOptions.Input"
              v-model="formData[item.field]"
              v-bind="readComponentPropsItem(item)"
              :placeholder="readComponentPlaceholder(item)"
              :custom-props="readComponentPropsItem(item)"
            />

            <BasicInput
              v-else-if="item.component == ComponentOptions.InputNumber"
              v-model="formData[item.field]"
              v-bind="readComponentPropsItem(item)"
              type="number"
              :placeholder="readComponentPlaceholder(item)"
              :custom-props="readComponentPropsItem(item)"
            />

            <ApiSelect
              v-else-if="item.component == ComponentOptions.ApiSelect"
              v-model:value="formData[item.field]"
              v-bind="readComponentPropsItem(item)"
              :place="readComponentPlaceholder(item)"
              @change="(e) => readComponentChange(item, e)"
            />

            <textarea
              v-else-if="item.component == ComponentOptions.Textarea"
              v-model="formData[item.field]"
              v-bind="readComponentPropsItem(item)"
              :maxlength="item.componentProps?.maxlength || -1"
              :placeholder="readComponentPlaceholder(item)"
            />

            <uni-data-checkbox
              v-else-if="item.component == ComponentOptions.GroupRadio"
              v-bind="readComponentPropsItem(item)"
              v-model="formData[item.field]"
            />

            <uni-datetime-picker
              v-else-if="item.component == ComponentOptions.DateTime"
              v-bind="readComponentPropsItem(item)"
              v-model="formData[item.field]"
              :placeholder="readComponentPlaceholder(item)"
              rangeSeparator="~"
              @change="(e) => readComponentChange(item, e)"
            />

            <switch
              v-else-if="item.component == ComponentOptions.Switch"
              :checked="readComponentDefValue(item)"
              :type="readComponentPropsItem(item)?.type"
              :color="readComponentPropsItem(item)?.color ?? APP_PRESET_COLOR"
              @change="(e) => readComponentChange(item, e)"
            />

            <uni-file-picker
              v-else-if="item.component == ComponentOptions.Upload"
              v-bind="readComponentPropsItem(item)"
              v-model="formData[item.field]"
              @success="(e) => readComponentChange(item, e)"
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
          :loading="isSubmitLoading"
          :custom-props="{
            text: '提 交',
            shape: 'square',
            type: 'primary',
            ...(formProps.submitButtonOptions || {}),
          }"
          @tap.stop="debounce(btnHandleSubmit)"
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
  unref,
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
import BasicInput from '@/components/Basic/Input/src/BasicInput.vue'
import BasicButton from '@/components/Basic/Button/src/BasicButton.vue'
import { isArray, isFunction, isNumber, isObject, isString } from '@/utils/is'
import { APP_PRESET_COLOR } from '@/settings/designSetting'
import { dateUtil, DATE_TIME_FORMAT } from '@/utils/dateUtil'
import debounce from '@/utils/lib/debounce'
import ApiSelect from '@/components/Basic/ApiSelect/src/ApiSelect.vue'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})

onMounted(async () => {
  emits('register', formMethods)
})

const props = defineProps(baseFormProps)
const emits = defineEmits<{
  (e: 'register', methods: BasicForm.FormMethodsType): Promise<any>
}>()

const isSubmitLoading = ref(false)
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
  if (isSubmitLoading.value) return
  isSubmitLoading.value = true

  try {
    await validate()

    await handleSubmit()
  } catch (error) {
  } finally {
    isSubmitLoading.value = false
  }
}

const getFieldsValue: BasicForm.FormMethodsType['getFieldsValue'] = () => {
  if (formProps.fieldMapToDouble)
    formProps.schemas?.forEach((item) => formatFieldMapToDouble(item))

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
        await formProps.submitApiFunc?.(unref(formData))
        showToast('操作成功')
        resolve(true)
      } catch (error) {
        typeof error == 'string'
          ? showToast(error || '操作失败')
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

    if (formProps.schemas) {
      setFieldsValue(
        formProps.schemas.reduce((pre, el) => {
          const self_data = getFieldsValue()
          if (el.defaultValue && !self_data[el.field]) {
            pre[el.field] = el.defaultValue
          }
          return pre
        }, {}),
      )
    }
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
    let array = isArray(field) ? field : new Array(field)
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
    const array = isArray(data) ? data : new Array(data)

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
    const array = isArray(data) ? data : new Array(data)
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
        const self_data = formData[el.field]
        if (
          el.required &&
          (self_data === '' || self_data === null || self_data === undefined)
        ) {
          const msg = readComponentPlaceholder(el)
          throw msg
        } else if (el.rule && isString(self_data)) {
          const self_rule_test = isString(el.rule)
            ? RegExp(escapeRegExp(el.rule)).test(self_data)
            : el.rule?.test?.(self_data)
          if (!self_rule_test) {
            const msg = el.ruleMsg || `${el.label}格式有误，请检查`
            throw msg
          }
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

/** 处理所有组件的属性，如果为函数则执行 */
function readComponentPropsItem(item: BasicForm.FormSchema) {
  const {
    component = '',
    componentProps = {},
    dynamicDisabled,
  } = deepClone(item)

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
    case ComponentOptions.ApiSelect:
      break
    case ComponentOptions.DateTime:
      break
    case ComponentOptions.Input:
    default:
      break
  }

  if (dynamicDisabled !== undefined) componentProps.disabled = dynamicDisabled

  return (
    (isFunction(componentProps)
      ? componentProps({
          formModel: formData,
          formActionType: formMethods,
          schema: item,
        })
      : componentProps) || {}
  )
}

/** 处理所有组件的占位符 */
function readComponentPlaceholder(item: BasicForm.FormSchema) {
  let defMsg = ''

  switch (item.component) {
    case ComponentOptions.DateTime:
    case ComponentOptions.ApiSelect:
    case ComponentOptions.GroupRadio:
    case ComponentOptions.Switch:
      defMsg = '请选择'
      break
    case ComponentOptions.Input:
    case ComponentOptions.InputNumber:
    case ComponentOptions.Textarea:
    default:
      defMsg = '请输入'
      break
  }

  return (
    item.componentProps?.placeholder ||
    `${defMsg}${filterLabel(item.label, item)}`
  )
}

/** 处理所有组件的更改回调函数 */
function readComponentChange(item: BasicForm.FormSchema, e) {
  const self_comp = readComponentPropsItem(item)

  switch (item.component) {
    case ComponentOptions.DateTime:
      const self_format =
        readComponentPropsItem(item)?.format || DATE_TIME_FORMAT

      if (isArray(e))
        formatFieldMapToDouble?.(item) ??
          e.map((el) => dateUtil(el).format(self_format))
      else dateUtil(e).format(self_format)
      break
    case ComponentOptions.Switch:
      formData.value[item.field] = e.detail.value ?? ''
      break
    case ComponentOptions.ApiSelect:
      break
    case ComponentOptions.GroupRadio:
      break
    case ComponentOptions.Input:
    case ComponentOptions.InputNumber:
    case ComponentOptions.Textarea:
    default:
      break
  }
}

/** 处理所有组件的默认值 */
function readComponentDefValue(item: BasicForm.FormSchema) {
  // const self_comp = readComponentPropsItem(item)
  let self_val = formData.value[item.field]

  switch (item.component) {
    case ComponentOptions.Switch:
      if (isString(self_val)) {
        self_val = +self_val ? true : false
      } else if (isNumber(self_val)) {
        self_val = self_val <= 0 ? true : false
      }
      break
    case ComponentOptions.ApiSelect:
      break
    default:
      break
  }

  return self_val
}

/** 处理映射字段为两个 */
function formatFieldMapToDouble(item: BasicForm.FormSchema) {
  const self_fieldMapToDouble = formProps.fieldMapToDouble?.find((el) =>
    el[0].includes(item.field),
  )

  if (isArray(self_fieldMapToDouble)) {
    const [field, double, format] = self_fieldMapToDouble
    if (!field.includes(item.field)) return true

    const [field1, field2] = double
    const [val1, val2] = formData.value[field]

    formData.value[field1] = format?.(val1) ?? val1
    formData.value[field2] = format?.(val2) ?? val2
  }
  return true
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

::v-deep .input-placeholder {
  color: #c0bdc1;
}

.basic-form {
  width: 100%;
  height: auto;

  ::v-deep .uni-file-picker {
    padding: 5px;
  }

  .basic-form-content {
    min-height: 100rpx;

    display: grid;

    font-size: 28rpx;

    .basic-form-content_title {
      @include font(40rpx, 50rpx, #525252, 600);
      margin-bottom: 12px;
      grid-column: 1/-1;
    }

    .form-item {
      margin-bottom: 20rpx;
      width: 100%;

      //&:last-child {
      // margin-bottom: 0rpx;
      //}

      .label {
        @include font(28rpx, 40px, #333, 400);
        white-space: nowrap;
      }

      .input {
        padding: 0 20rpx;
        min-height: 100%;
        display: flex;
        align-items: center;

        &.bordered {
          border: 1px solid #dcdfe6;
          border-radius: 8rpx;
        }
        &.disabled {
          background: #f5f7fa;
        }

        uni-textarea {
          padding-top: 16rpx;
          width: 100%;
        }

        ::v-deep .uni-date {
          transform: translateX(-10rpx);
          .uni-date-editor--x {
            border-width: 0;
          }
        }
      }

      ::v-deep .basic-input_inner {
        padding: 0;
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
