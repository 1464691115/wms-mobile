<template>
  <scroll-view
    scroll-y
    refresher-enabled
    :refresher-triggered="pullDownTriggered"
    @refresherrefresh="handlePullDownRef"
    @refresherrestore="() => (pullDownTriggered = 'restore')"
  >
    <view class="stock-goods_search flex justify-between">
      <BasicInput v-model="searchVal" placeholder="请输入货品名称或者分类">
        <template #prefix>
          <Icon :icon="ICON_UNICODE.SEARCH" color="#989898" size="33" />
        </template>
      </BasicInput>
    </view>
    <view
      v-if="!moveSelectByStockList?.length"
      class="full justify-center"
      style="padding-top: 100rpx"
    >
      <IconColor
        :icon="ICON_COLOR_UNICODE.COLORQUESHENGYE_ZANWUSHUJU"
        :size="200"
      />
    </view>
    <view v-else class="stock-goods flex-wrap">
      <view
        v-for="item in moveSelectByStockList"
        :key="item.id"
        class="stock-goods-item"
      >
        <view class="stock-goods-item_title">{{ item.materialName }}</view>
        <view>编码：{{ item.materialCode }}</view>
        <view>分类：{{ item.materialCategoryName }}</view>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import BasicInput from '@/components/Basic/Input/src/BasicInput.vue'
import IconColor from '@/components/Basic/IconColor/src/IconColor.vue'
import Icon from '@/components/Basic/Icon/src/Icon.vue'
import { moveSelectByStockEntryIdApi } from '@/service/move'
import useAxiosRef from '@/utils/hooks/web/useAxiosRef'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})
let _freshing = false

const props = defineProps({
  sid: String,
})

const [moveSelectByStockData, reload] = useAxiosRef({
  api: moveSelectByStockEntryIdApi.bind(null, {
    stockEntryId: props.sid,
  }),
})

const pullDownTriggered = ref(false as string | boolean)
const searchVal = ref('')

const moveSelectByStockList = computed(
  () =>
    (!searchVal.value
      ? moveSelectByStockData.value
      : moveSelectByStockData.value?.filter((el) =>
          [el.materialName, el.materialCategoryName].some((sl) =>
            sl.includes(searchVal.value),
          ),
        )) || [],
)

async function handlePullDownRef() {
  if (_freshing) return
  _freshing = true
  pullDownTriggered.value = true

  await reload()
  pullDownTriggered.value = false
  _freshing = false
}
</script>

<style lang="scss" scoped>
$_zw: 690rpx;

scroll-view {
  height: 100%;
  background-color: #fff;

  ::v-deep .basic-input {
    .basic-input_group-content {
      height: 64rpx;

      background-color: #f0f0f0;
      border-radius: 64rpx;
    }
  }
}

.stock-goods_search {
  margin: 20rpx 0;
  padding: 0 30rpx;

  align-items: center;

  &-btn {
    margin-left: 22rpx;
    text-wrap: nowrap;
    color: #343434;
    font-size: 28rpx;
    line-height: 28rpx;
  }
}

.stock-goods {
  padding: 0 20rpx;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  &-item {
    margin-top: 20rpx;
    padding: 20rpx;
    width: 100%;
    background-color: #fff;
    border-radius: 10rpx;
    border: 1rpx solid #2569e6;
    color: #666;
  }

  &-item_title {
    font-weight: bold;
    font-size: 32rpx;
    color: #333;
  }
}
</style>
