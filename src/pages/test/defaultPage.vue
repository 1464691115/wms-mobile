<template>
  <view class="virtualized-list">
    <BasicForm @register="register"></BasicForm>
  </view>
</template>
<script lang="ts" setup>
import { ComponentOptions, useForm } from '@/components/Basic/Form'
import BasicForm from '@/components/Basic/Form/src/BasicForm.vue'
import { onMounted } from 'vue'

const [register, { setFieldsValue }] = useForm({
  schemas: [
    {
      field: 'test',
      label: '事件',
      component: ComponentOptions.ApiSelect,
      componentProps: {
        resultField: '',
        api: function () {
          return new Promise((res) =>
            setTimeout(
              () =>
                res([
                  { label: 'test', value: 1 },
                  { label: 'test1', value: 2 },
                  { label: 'test2', value: 3 },
                  { label: 'test3', value: 4 },
                ]),
              1000,
            ),
          )
        },
      },
    },
  ],
})

onMounted(() => {
  setFieldsValue({ test: '1' })
})
</script>
<style lang="scss" scoped></style>
