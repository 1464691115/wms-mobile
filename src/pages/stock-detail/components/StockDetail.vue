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
    </view>
  </view>
</template>

<script lang="ts" setup>
import Icon from '@/components/Basic/Icon/src/Icon.vue'
import { getStockEntryInfo } from '@/service/stock'
import useAxiosRef from '@/utils/hooks/web/useAxiosRef'
import { watch } from 'vue'

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

watch(
  () => props.sid,
  (val) => {
    if (!val) return

    reload({ id: val })
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
    ::v-deep .uni-section {
      &-header {
        align-items: flex-start;
        &__decoration {
          margin-top: 8rpx;
        }
      }
    }
  }
}
</style>
