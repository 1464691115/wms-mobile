<template>
  <scroll-view
    scroll-y
    refresher-enabled
    :refresher-triggered="pullDownTriggered"
    @refresherrefresh="handlePullDownRef"
    @refresherrestore="() => (pullDownTriggered = 'restore')"
    @scrolltolower="reload"
  >
    <ListView
      v-if="uuBuildId"
      :api="getStockOutApiList"
      is-custom-next
      :params="queryParams"
      :on-register="register"
    >
      <template #empty>
        <view class="full" style="padding-top: 100rpx">
          <Icon :icon="ICON_UNICODE.QUESHENGYE_QINGDENGDAI" />
        </view>
      </template>
      <template v-slot="{ list }">
        <view class="stock-entry flex-wrap">
          <view v-for="item in list" :key="item.id" class="stock-entry-item">
            <view>订单号：{{ item.orderNumber }}</view>
            <view>创建人：{{ item.createUserName }}</view>
            <view>创建日期：{{ item.createTime }}</view>
          </view>
        </view>
      </template>
    </ListView>
  </scroll-view>
</template>

<script lang="ts" setup>
import { usePagination } from '@/layout/ListView'
import ListView from '@/layout/ListView/ListView.vue'
import { nextTick, onMounted, ref, watch } from 'vue'
import { buildUUID } from '@/utils/uuid'
import { getStockOutApiList } from '@/service/stock-list'
import Icon from '@/components/Basic/Icon/src/Icon.vue'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})

const props = defineProps({
  searchQuery: String,
  params: Object,
})

onMounted(() => {
  queryParams.value = Object.assign(queryParams.value, props.params || {})
})

const [register, { reloadPagination, resetPagination }] = usePagination()

const pullDownTriggered = ref(false as string | boolean)
const uuBuildId = ref('uuid')
const queryParams = ref({
  title: '',
  tid: 0,
})

watch(
  () => [props.searchQuery, queryParams.value.tid],
  () => {
    queryParams.value.title = props.searchQuery || ''

    resetPagination()
    reloadPagination()
  },
)

function reload() {
  reloadPagination()
}

async function handlePullDownRef() {
  if (!uuBuildId.value) return
  uuBuildId.value = ''

  await nextTick()
  uuBuildId.value = buildUUID()

  pullDownTriggered.value = true
  await nextTick()
  pullDownTriggered.value = false
}
</script>

<style lang="scss" scoped>
$_zw: 690rpx;

scroll-view {
  height: 100%;
}

.stock-entry {
  padding: 0 20rpx;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  &-item {
    margin-top: 20rpx;
    padding: 10rpx 20rpx;
    width: 100%;
    background-color: #fff;
    border-radius: 10rpx;
  }
}
</style>
