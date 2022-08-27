<template>
  <view class="wrap">
    <s-button :custom-props="{ text, shape: 'square' }" />
    <BasicForm @register="register" :show-submit-button="true" />
  </view>
</template>

<script lang="ts" setup>
import { useForm } from "@/components/Basic/Form";
import { ref } from "vue";
import BasicForm from "@/components/Basic/Form/src/BasicForm.vue";

const showTime = ref(false);
const text = ref("111");
const [register, { getFieldsValue, setProps ,setFieldsValue}] = useForm({
  formTitle: "发送诊疗记录",
  schemas: [
    {
      field: "email",
      label: "邮箱地址",
      component: "Input",
      componentProps: { placeholder: "请填写xxx" },
    },
  ],
  submitButtonOptions: {
    text: "发送",
  },
  submitFunc: async () => {
    console.log(getFieldsValue());
  },
});

setTimeout(() => {
  text.value = "222";

  setProps({
    formTitle: text.value,
  });

setFieldsValue({
  email:'14292492@qq.com'
})

}, 1000);
</script>

<style>
.wrap {
  width: 100%;
  height: auto;
}
</style>
