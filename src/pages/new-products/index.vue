<template>
  <view class="new-products new-products-wrap">
    <view class="new-products-form">
      <BasicForm @register="register"></BasicForm>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ComponentOptions, useForm } from '@/components/Basic/Form'
import BasicForm from '@/components/Basic/Form/src/BasicForm.vue'

const [register] = useForm({
  layout: 'horizontal',
  baseColProps: {
    span: 24,
  },
  labelWidth: 200,
  colon: false,
  showResetButton: false,
  schemas: [
    {
      label: '货品名称',
      field: 'name',
      component: ComponentOptions.Input,
      required: true,
    },
    {
      label: '规格型号',
      field: 'specs',
      component: ComponentOptions.Input,
    },
    {
      label: '货品编码',
      field: 'orderNo',
      component: ComponentOptions.Input,
      componentProps: {
        placeholder: '不输入则自动编码',
      },
    },
    {
      label: '条形码',
      field: 'barCode',
      component: ComponentOptions.Input,
    },
    {
      label: '货品类型',
      field: 'type',
      component: ComponentOptions.Select,
    },
    {
      label: '初始仓库',
      field: 'warehouse',
      component: ComponentOptions.Select,
    },
    {
      label: '货品图片',
      field: 'img',
      component: ComponentOptions.Upload,
    },
    {
      label: '备注',
      field: 'descript',
      component: ComponentOptions.Textarea,
    },
  ],
  submitApiFunc() {
    console.log(arguments)
  },
})
</script>

<style lang="scss" scoped>
.new-products {
  background-color: #fff;
  height: 100%;

  .new-products-form {
    padding: 30rpx 36rpx 40rpx;
  }
}
</style>
