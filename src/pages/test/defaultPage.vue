<template>
  <view class="virtualized-list">
    <BasicForm @register="register"></BasicForm>
  </view>
</template>
<script lang="ts" setup>
import { ComponentOptions, useForm } from '@/components/Basic/Form'
import BasicForm from '@/components/Basic/Form/src/BasicForm.vue'
import { dateUtil } from '@/utils/dateUtil'

const [register] = useForm({
  schemas: [
    {
      field: 'test',
      label: '事件',
      component: ComponentOptions.DateTime,
      componentProps: {
        type: 'daterange',
      },
    },
  ],
  fieldMapToDouble: [
    ['test', ['date1', 'date2'], (val) => dateUtil(val).format('DD/MM/YYYY')],
  ],
})
</script>
<style lang="scss" scoped></style>
