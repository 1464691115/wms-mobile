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
import { getCategoryList } from '@/service/sys/category'
import { getCompanyList } from '@/service/sys/company'
import { CategoryType } from '@/service/sys/model/categoryModel'
import { CompanyCategoryType } from '@/service/sys/model/companyModel'

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
      label: '出库单',
      field: 'number',
      component: ComponentOptions.Input,
      dynamicDisabled: true,
      componentProps: {
        placeholder: '单号将由系统自动生成',
      },
    },
    {
      label: '订单号',
      field: 'orderNumber',
      component: ComponentOptions.Input,
      componentProps: {
        placeholder: '不输入则自动编码',
      },
    },
    {
      label: '货品类型',
      field: 'categoryId',
      component: ComponentOptions.ApiSelect,
      componentProps: {
        api: getCategoryList.bind(this, CategoryType.出库单),
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      label: '客户',
      field: 'companyId',
      component: ComponentOptions.ApiSelect,
      componentProps: {
        api: getCompanyList.bind(this, CompanyCategoryType.客户),
        resultField: 'data.list',
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      label: '备注',
      field: 'remark',
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
