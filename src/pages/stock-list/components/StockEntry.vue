<template>
  <scroll-view
    scroll-y
    refresher-enabled
    :refresher-triggered="pullDownTriggered"
    @refresherrefresh="handlePullDownRef"
    @refresherrestore="() => (pullDownTriggered = 'restore')"
    @scrolltolower="reload"
  >
    <view style="height: 20rpx" />

    <ListView
      v-if="uuBuildId"
      :api="getStockEntryApiList"
      is-custom-next
      :params="queryParams"
      :on-register="register"
    >
      <template #empty>
        <view class="full" style="padding-top: 100rpx"></view>
      </template>
      <template v-slot="{ list }">
        <view class="course-scroll-wrap offline-live-menu-course flex-wrap">
          <view v-for="item in list" :key="item.id">
            {{ item.orderNumber }}
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
import { getStockEntryApiList } from '@/service/stock-list'

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

.offline-live-menu-course {
  padding: 0 45rpx;
}

::v-deep .course-item {
  height: 280rpx !important;
  min-height: 280rpx !important;

  &_info {
    display: none;
  }

  &_title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    white-space: initial;
  }
}

.offline-live-menu {
  overflow-x: hidden;

  &-content {
    margin-top: 20rpx;

    & ::v-deep .home-banner-wrap {
      @include wh(654rpx, 304rpx, none);
      @include border(none, 32rpx);
      position: relative;

      .home-banner-dot {
        bottom: 14rpx;
        right: 32rpx;
        z-index: 2;
      }

      .swiper-dot_item-active,
      .swiper-dot_item {
        background-color: #fff !important;
      }
    }
  }

  &-type {
    margin: 31rpx 0 50rpx 0;
    padding: 0 0 0 48rpx;
    width: 100%;

    &-item {
      @include wh(178rpx, 76rpx);
      @include border(auto, 32rpx);
      margin-right: 24rpx;
    }
  }

  &-list {
    margin: 30rpx 0 35rpx;
  }

  &-section {
    padding-left: 49rpx;
    width: 100%;
  }

  &-course {
    margin: 30rpx -4rpx 0;
    width: auto;

    ::v-deep .course-item {
      margin: 0 4rpx 22rpx;
    }
  }
}
</style>
