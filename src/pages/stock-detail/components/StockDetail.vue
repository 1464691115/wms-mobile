<template>
  <view class="stock-detail">
    <view class="stock-detail_title">
      <uni-section
        :title="`单号 ${stockDetailInfo?.orderNumber || ''}`"
        :sub-title="
          [
            stockDetailInfo?.createUserName,
            stockDetailInfo?.createTime,
            '创建',
          ].join(' ')
        "
        type="line"
      >
        <template #right>
          <view class="flex-col align-center">
            <Icon :icon="ICON_UNICODE.PRINT" color="#348BF4" :size="50" />
          </view>
        </template>
      </uni-section>

      <BasicForm @register="register" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useForm } from '@/components/Basic/Form'
import BasicForm from '@/components/Basic/Form/src/BasicForm.vue'
import Icon from '@/components/Basic/Icon/src/Icon.vue'
import { getStockEntryInfo } from '@/service/stock'
import useAxiosRef from '@/utils/hooks/web/useAxiosRef'
import { watch } from 'vue'
import { formSchema } from '../index.data'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})

const props = defineProps({
  sid: String,
})

const [stockDetailInfo, reload] = useAxiosRef({
  api: getStockEntryInfo,
  immediate: false,
})

const [register, { setFieldsValue }] = useForm({
  schemas: formSchema,
  layout: 'vertical',
  baseColProps: {
    span: 24,
  },
  showActionButtonGroup: false,
})

watch(
  () => props.sid,
  (val) => {
    if (!val) return

    reload({ id: val }).then(() => {
      setFieldsValue(stockDetailInfo.value)
    })
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.stock-detail {
  background-color: #fff;

  &_title {
    padding: 0 10rpx;

    ::v-deep .uni-section {
      &-header {
        padding: 18rpx 0;
        align-items: flex-start;
        &__decoration {
          margin-top: 8rpx;
        }
      }
    }
  }
}
</style>
