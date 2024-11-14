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
import { addMaterialList } from '@/service/material'
import { getCategoryList } from '@/service/sys/category'
import { CategoryType } from '@/service/sys/model/categoryModel'
import { showToast } from '@/utils/lib/s-view'
import { buildUUID } from '@/utils/uuid'
import { onShow } from '@dcloudio/uni-app'

const getCategoryListApi = (p) => ({
  api: () => getCategoryList(p),
  labelField: 'name',
  valueField: 'id',
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
      defaultValue: buildUUID(),
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
      component: ComponentOptions.ApiSelect,
      componentProps: getCategoryListApi(CategoryType.物料分类),
    },
    {
      label: '单位',
      field: 'unitId',
      component: ComponentOptions.ApiSelect,
      componentProps: getCategoryListApi(CategoryType.单位类别),
    },
    {
      label: '安全库存',
      field: 'safeNum',
      component: ComponentOptions.Input,
      componentProps: {},
    },
    {
      label: '有效期（0为永久有效）',
      field: 'validDay',
      component: ComponentOptions.Input,
      componentProps: {},
      defaultValue: 0,
    },

    {
      label: '备注',
      field: 'remark',
      component: ComponentOptions.Textarea,
      componentProps: (_) => ({}),
    },
  ],

  async submitApiFunc(data) {
    const res = await addMaterialList({
      ...data,
      type: 2,
    })
    showToast('添加成功').finally(() => {
      uni.navigateBack()
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
