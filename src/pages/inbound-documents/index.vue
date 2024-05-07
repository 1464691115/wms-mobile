<template>
  <view class="inbound-documents inbound-documents-wrap">
    <view class="inbound-documents-form">
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
      label: '单据日期',
      field: 'date',
      component: ComponentOptions.DateTime,
      componentProps: {
        defaultValue: new Date(),
      },
    },
    {
      label: '单据编号',
      field: 'orderNo',
      component: ComponentOptions.Input,
      componentProps: {
        placeholder: '不输入则自动编码',
      },
    },
    {
      label: '仓库',
      field: 'warehouse',
      component: ComponentOptions.Select,
      required: true,
    },
    {
      label: '货品类型',
      field: 'type',
      component: ComponentOptions.Select,
    },
    {
      label: '部门',
      field: 'department',
      component: ComponentOptions.Select,
    },
    {
      label: '往来单位',
      field: 'correspondents',
      component: ComponentOptions.Select,
    },
    {
      label: '交货人',
      field: 'deliverer',
      component: ComponentOptions.Input,
    },
    {
      label: '联系电话',
      field: 'phone',
      component: ComponentOptions.Input,
    },
    {
      label: '经办人',
      field: 'attn',
      component: ComponentOptions.Input,
    },
    {
      label: '附件',
      field: 'img',
      component: ComponentOptions.Upload,
      componentProps: {
        limit: 3,
      },
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
.inbound-documents {
  background-color: #fff;
  min-height: 100%;

  .inbound-documents-form {
    padding: 30rpx 36rpx 40rpx;
  }
}
</style>
