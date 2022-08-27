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
          <text>{{ formProps.formTitle || "" }}</text>
        </slot>
      </view>

      <view
        v-for="(item, index) in formProps.schemas || []"
        class="form-item"
        :key="item.field"
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

        <s-input
          v-if="item.component == 'Input'"
          v-model="formData[item.field]"
          :placeholder="
            item.componentProps?.placeholder || `请填写${filterLabel(item.label, item)}`
          "
          :custom-props="item.componentProps || {}"
        />

        <view v-else-if="item.component == 'Textarea'" class="input">
          <textarea
            v-model="formData[item.field]"
            :maxlength="item.componentProps?.maxlength || -1"
            :placeholder="
              item.componentProps?.placeholder || `请填写${filterLabel(item.label, item)}`
            "
            :auto-height="item.componentProps?.autoHeight"
            class="input-textarea"
            style="width: 100%"
          />
        </view>
      </view>
    </view>

    <slot name="formFooter" :formData="formData">
      <view class="basic-form-btns flex-d-r">
        <s-button
          v-if="formProps.showResetButton === true"
          text="重 置"
          shape="square"
          class="btn-text"
          :custom-props="{
            text: '重 置',
            shape: 'square',
            ...(formProps.resetButtonOptions || {}),
          }"
          @tap.stop="btnHandleReset"
        />
        <s-button
          v-if="formProps.showSubmitButton === true"
          class="btn-text"
          :custom-props="{
            text: '提 交',
            shape: 'square',
            type: 'primary',
            ...(formProps.resetButtonOptions || {}),
          }"
          @tap.stop="btnHandleSubmit"
        />
      </view>
    </slot>
  </view>
</template>
<script lang="ts" setup>
import { ApiErrorMsg } from "@/api/instanceof";
import { showToast, funcForIn, createArray } from "sview-ui";
import { computed, CSSProperties, nextTick, onMounted, reactive, ref, watch } from "vue";
import { filterComponentsProps, filterLabel, filterColon } from "./filter";
import { BasicForm } from "./types";

onMounted(async () => {
  emits("register", formMethods);
});

interface Props<BF extends BasicForm.FormProps = BasicForm.FormProps> {
  /** 是否显示 分号， 如果为 字符串则替换 */
  colon?: BF["colon"];

  baseColProps?: BF["baseColProps"];
  baseRowStyle?: BF["baseRowStyle"];

  labelWidth?: BF["labelWidth"];
  labelAlign?: BF["labelAlign"];
  gutter?: BF["gutter"];

  formTitle?: BF["formTitle"];

  layout?: BF["layout"];

  submitApiFunc?: BF["submitApiFunc"];

  schemas?: BF["schemas"];

  showResetButton?: BF["showResetButton"];
  resetButtonOptions?: BF["resetButtonOptions"];
  showSubmitButton?: BF["showSubmitButton"];
  submitButtonOptions?: BF["submitButtonOptions"];
  resetFunc?: BF["resetFunc"];
  submitFunc?: BF["submitFunc"];
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "register", methods: BasicForm.FormMethodsType): Promise<any>;
}>();

const formData = ref({});
const formProps = reactive<Partial<Props>>({});

/** 获取当前 item所占的行 */
const formFormItemSpan = computed(() => {
  if (!formProps.schemas) return createArray(formProps.baseColProps?.span || 4, 12);

  return formProps.schemas.map((el) => {
    return el.colProps?.span || formProps.baseColProps?.span || 12;
  });
});

/** 获取当前 表单的布局样式 */
const getFormLayoutStyle = computed<CSSProperties>(() => {
  const layout = formProps.layout;
  switch (layout) {
    case "vertical":
      return {};

    case "horizontal":
    default:
      return {
        display: "flex",
        alignItems: "cetner",
      };
  }
});

watch(
  () => props,
  (val) => {
    funcForIn(val, formProps);
    if (formProps.schemas) {
      formProps.schemas = filterComponentsProps(formProps.schemas, {
        schema: formProps.schemas,
        formActionType: formMethods,
        formModal: formData.value,
      });
    }
  },
  { immediate: true }
);

/** 重置表单 */
function btnHandleReset() {
  resetFields();
}
/** 提交表单 */
function btnHandleSubmit() {
  handleSubmit();
}

const getFieldsValue: BasicForm.FormMethodsType["getFieldsValue"] = () => {
  return formData.value;
};

const setFieldsValue: BasicForm.FormMethodsType["setFieldsValue"] = (values = {}) => {
  return new Promise((resolve) => {
    funcForIn(values, formData.value);
    nextTick(() => resolve(true));
  });
};

const resetFields: BasicForm.FormMethodsType["resetFields"] = () => {
  return new Promise(async (resolve, reject) => {
    if (formProps.resetFunc !== undefined) {
      formProps.resetFunc().finally(() => resolve(true));
    } else {
      formData.value = {};
      nextTick(() => resolve(true));
    }
  });
};

const handleSubmit: BasicForm.FormMethodsType["submit"] = () => {
  return new Promise(async (resolve, reject) => {
    if (formProps.submitFunc !== undefined) {
      formProps.submitFunc().finally(() => resolve(true));
    } else {
      try {
        console.log(formProps.submitApiFunc);

        await formProps.submitApiFunc?.(formData);
        await showToast("操作成功");
        resolve(true);
      } catch (error) {
        if (error instanceof ApiErrorMsg) showToast(error.msg);
        reject(error);
      }
    }
  });
};

const setProps: BasicForm.FormMethodsType["setProps"] = (_formProps) => {
  return new Promise(async (resolve, reject) => {
    funcForIn(_formProps, formProps);
    formProps.schemas = filterComponentsProps(formProps.schemas, {
      schema: formProps.schemas,
      formActionType: formMethods,
      formModal: formData.value,
    });
    nextTick(() => resolve(true));
  });
};

const getProps: BasicForm.FormMethodsType["getProps"] = () => {
  return formProps;
};

const removeSchemaByFiled: BasicForm.FormMethodsType["removeSchemaByFiled"] = (filed) => {
  return new Promise(async (resolve, reject) => {
    let array = Array.isArray(filed) ? filed : new Array(filed);
    formProps.schemas = formProps.schemas?.filter((el) => {
      if (array.includes(el.field)) {
        array = array.filter((a_el) => a_el !== el.field);
        return false;
      }
      return true;
    });

    nextTick(() => resolve(true));
  });
};

const appendSchemaByField: BasicForm.FormMethodsType["appendSchemaByField"] = (
  schema,
  prefixField,
  first
) => {
  return new Promise(async (resolve, reject) => {
    const prefixIndex =
      formProps.schemas?.findIndex((s_el) => s_el.field == prefixField) || -1;

    if (!formProps.schemas) {
      resolve(false);
      return;
    }

    const operate = first ? formProps.schemas.length - 1 : 0;
    formProps.schemas?.splice(
      !prefixField || prefixIndex == -1 ? operate : prefixIndex,
      0,
      schema
    );

    nextTick(() => resolve(true));
  });
};

const updateSchema: BasicForm.FormMethodsType["updateSchema"] = (data) => {
  return new Promise(async (resolve, reject) => {
    const array = Array.isArray(data) ? data : new Array(data);

    if (!formProps.schemas) {
      resolve(false);
      return;
    }

    array.forEach((item) => {
      formProps.schemas?.forEach((val) => {
        if (val.field === item.field) {
          val = item as BasicForm.FormSchema;
        }
      });
    });

    nextTick(() => resolve(true));
  });
};

const resetSchema: BasicForm.FormMethodsType["resetSchema"] = (data) => {
  return new Promise(async (resolve) => {
    const array = Array.isArray(data) ? data : new Array(data);
    formProps.schemas = (array as unknown) as BasicForm.FormSchema[];
    nextTick(() => resolve(true));
  });
};

const formMethods: BasicForm.FormMethodsType = {
  getFieldsValue,
  setFieldsValue,
  resetFields,
  submit: handleSubmit,
  setProps,
  getProps,
  removeSchemaByFiled,
  appendSchemaByField,
  updateSchema,
  resetSchema,
};

defineExpose({
  ...formMethods,
  formData,
});
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
      }

      .input {
        padding: 30rpx 30rpx;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        font-size: 14px;
        flex: 1;
        background-color: #fff;

        .input-textarea {
          min-height: 80rpx;
        }
      }
    }

    text {
      font-size: 40rpx;
    }
  }
}
</style>
