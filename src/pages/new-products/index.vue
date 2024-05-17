<template>
  <view class="new-products new-products-wrap">
    <view class="new-products-form">
      <BasicForm @register="register" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ComponentOptions, useForm } from '@/components/Basic/Form'
import BasicForm from '@/components/Basic/Form/src/BasicForm.vue'
import useAxiosRef from '@/hooks/web/useAxiosRef'
import { addMaterialList } from '@/service/material'
import { getCategoryList } from '@/service/sys/category'
import { CategoryType } from '@/service/sys/model/categoryModel'
import { onShow } from '@dcloudio/uni-app'

const [categoryList] = useAxiosRef({
  api: getCategoryList.bind(null, CategoryType.物料分类),
})
const [unitList] = useAxiosRef({
  api: getCategoryList.bind(null, CategoryType.单位类别),
})

const [register] = useForm({
  layout: 'horizontal',
  baseColProps: {
    span: 24,
  },
  labelWidth: 150,
  colon: false,
  showResetButton: false,
  schemas: [
    {
      label: '物料编号',
      field: 'code',
      component: ComponentOptions.Input,
      dynamicDisabled: true,
      defaultValue: Date.now() + Math.round(Math.random() * 899 + 100),
    },
    {
      label: '货品名称',
      field: 'name',
      component: ComponentOptions.Input,
      required: true,
    },
    {
      label: '货品类型',
      field: 'categoryId',
      component: ComponentOptions.Select,
      componentProps: {
        options: categoryList,
        rangeLabel: 'name',
        rangeId: 'id',
      },
    },
    {
      label: '单位',
      field: 'unitId',
      component: ComponentOptions.Select,
      componentProps: {
        options: unitList,
        rangeLabel: 'name',
        rangeId: 'id',
      },
    },
    {
      label: '安全库存',
      field: 'safeNum',
      component: ComponentOptions.Input,
      componentProps: {},
    },
    {
      label: '有效天数',
      field: 'validDay',
      component: ComponentOptions.Input,
    },

    {
      label: '备注',
      field: 'remark',
      component: ComponentOptions.Textarea,
    },
  ] as const,
  async submitApiFunc(data) {
    const res = await addMaterialList({
      ...data,
      type: 2,
    })
  },
})

onShow(() => {})
</script>

<style lang="scss" scoped>
.new-products {
  background-color: #fff;
  height: 100%;

  .new-products-form {
    padding: 30rpx 36rpx 40rpx;
  }

  .new-products-button {
    margin: 20rpx 1rpx 0 0;
  }
}
</style>
