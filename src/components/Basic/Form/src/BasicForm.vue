<template>
  <view class="basic-form" @click.stop="() => {}">
    <view class="basic-form-content">
      <text>{{ formProps.formTitle || "" }}</text>
      <s-gap height="10px" />

      <view v-for="item in formProps.schemas || []" :key="item.field" class="form-item">
        <view class="label">{{ filterLabel(item.label, item) }}</view>

        <s-input
          v-if="item.component == 'Input'"
          v-model="formData[item.field]"
          :placeholder="
            item.componentProps.placeholder || `请填写${filterLabel(item.label, item)}`
          "
          :custom-props="item.componentProps"
        />

        <view v-else-if="item.component == 'Textarea'" class="input">
          <textarea
            v-model="formData[item.field]"
            :maxlength="item.componentProps.maxlength || -1"
            :placeholder="
              item.componentProps.placeholder || `请填写${filterLabel(item.label, item)}`
            "
            :auto-height="item.componentProps.autoHeight"
            class="input-textarea"
            style="width: 100%"
          />
        </view>
      </view>
    </view>

    <view class="basic-form-btns flex-d-r">
      <s-button
        v-if="formProps.showResetButton === true"
        :title="formProps.resetButtonOptions?.text || '重 置'"
        shape="square"
        class="btn-text"
        @tap.stop="btnHandleReset"
      />
      <s-button
        v-if="formProps.showSubmitButton === true"
        :title="formProps.submitButtonOptions?.text || '提 交'"
        shape="square"
        type="primary"
        class="btn-text"
        @tap.stop="btnHandleSubmit"
      />
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ApiErrorMsg } from "@/api/instanceof";
import { showToast, funcForIn } from "sview-ui";
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import { BasicForm } from "./types";

onMounted(async () => {
  emits("register", formMethods);
});

interface Props {
  /** 整个表单标题 */
  formTitle?: string;

  /** 提交方法 */
  submitApiFunc?: (...arg) => Promise<any>;

  /** 表单配置 */
  schemas?: BasicForm.FormSchema[];

  /** 是否显示重置按钮 默认 false*/
  showResetButton?: boolean;
  /** 重置按钮配置见下方 */
  resetButtonOptions?: BasicForm.ActionButtonOption;
  /** 是否显示提交按钮   默认 false*/
  showSubmitButton?: boolean;
  /** 确认按钮配置见下方 */
  submitButtonOptions?: BasicForm.ActionButtonOption;
  /** 自定义重置按钮逻辑 */
  resetFunc?: () => Promise<void>;
  /** 自定义提交按钮逻辑 */
  submitFunc?: () => Promise<void>;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "register", methods: BasicForm.FormMethodsType): Promise<any>;
}>();

const formData = ref({});
const formProps = reactive<Partial<Props>>({});

watch(
  () => props,
  (val) => {
    funcForIn(val, formProps);
  },
  { immediate: true }
);

function filterLabel(label?: string | Function, item) {
  return typeof label == "string" || label === undefined ? label : label(item);
}

/** 重置表单 */
function btnHandleReset() {
  resetFields();
}
/** 提交表单 */
function btnHandleSubmit() {
  handleSubmit();
}

/** 获取表单值 */
function getFieldsValue() {
  return formData.value;
}

/** 设置表单值 */
function setFieldsValue(values = {}) {
  return new Promise((resolve) => {
    funcForIn(values, formData.value);
    nextTick(() => resolve(true));
  });
}

/** 重置表单 */
function resetFields() {
  return new Promise((resolve) => {
    formData.value = {};
    nextTick(() => resolve(true));
  });
}

/** 提交表单 */
function handleSubmit() {
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
}

/** 设置表单组件的 Props */
function setProps(_formProps: Partial<Props>) {
  funcForIn(_formProps, formProps);
}

/** 根据 field 删除 Schema */
function removeSchemaByFiled(filed: string | string[]) {
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
}

/** 插入到指定 filed 后面，如果没传指定 field，则插入到最后,当 first = true 时插入到第一个位置 */
function appendSchemaByField(
  schema: BasicForm.FormSchema,
  prefixField?: string,
  first?: boolean
) {
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
}

/** 更新表单的 schema, 只更新函数所传的参数 */
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

/** 重置表单的 schema, 只更新函数所传的参数 */
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
  removeSchemaByFiled,
  appendSchemaByField,
  updateSchema,
  resetSchema,
};
</script>
<style lang="scss" scoped>
.basic-form {
  width: 100%;
  height: auto;

  .basic-form-content {
    padding: 20rpx;
    min-height: 200rpx;
    font-size: 32rpx;

    text {
      font-size: 40rpx;
    }
  }

  .basic-form-btns {
    width: 100%;
    height: 80rpx;

    .btn-text {
      @include flex-center;
      margin: 0 20px;
      padding: 20rpx 0;
      flex: 1;
      font-size: 34rpx;
    }
  }

  .form-item {
    margin-bottom: 20rpx;

    .label {
      margin-bottom: 10rpx;
    }

    .input {
      padding: 10rpx 30rpx;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      font-size: 14px;

      .input-textarea {
        min-height: 80rpx;
      }
    }
  }
}
</style>
