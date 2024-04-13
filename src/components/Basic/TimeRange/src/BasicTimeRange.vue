<template>
  <view class="basic-time-range">
    <view
      class="content justify-between wh"
      @click="() => emits('update:show', true)"
    >
      <text class="time-text">
        {{ currentTime.startTime }} - {{ currentTime.stopTime }}
      </text>
      <GlobalIcon :icon="ICON_UNICODE.calendar" color="#939393" />
    </view>

    <u-calendar
      :show="showTime"
      mode="range"
      :defaultDate="[currentTime.startTime, currentTime.stopTime]"
      monthNum="12"
      minDate="2022-1-1"
      :maxDate="Date.now() + 1000"
      @confirm="handleChangeTime"
      safe-area-inset-bottom
      @close="showTime = false"
    />
  </view>
</template>

<script lang="ts" setup>
import { moment } from '@/utils/global'
import { ref, watch } from 'vue'
import { BasicTimeRange as TimeRange } from './types'

defineOptions({
  options: { styleIsolation: 'shared' },
})

interface Props<
  BTR extends TimeRange.TimeRangeProps = TimeRange.TimeRangeProps,
> {
  query?: BTR['query']
  show: BTR['show']
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:show', val: boolean): void
  (e: 'update:query', val: TimeRange.TimeRangeProps['query']): void
  (e: 'change', val: TimeRange.TimeRangeProps['query']): void
}>()

const showTime = ref(false)
const currentTime = ref({
  startTime: moment().format('yyyy-MM-dd'),
  stopTime: moment().format('yyyy-MM-dd'),
})

watch(
  () => showTime.value,
  (val) => emits('update:show', val),
)
watch(
  () => props.show,
  (val) => val !== undefined && (showTime.value = val),
  { immediate: true },
)
watch(
  () => currentTime.value,
  (val) => {
    emits('change', val)
    emits('update:query', val)
  },
  { deep: true },
)

function handleChangeTime(e) {
  console.log(e)

  currentTime.value = {
    stopTime: e[1],
    startTime: e[0],
  }
  showTime.value = false
}
</script>

<style lang="scss" scoped>
.basic-time-range {
  height: 98rpx;
  padding: 16rpx 42rpx;
  border-radius: 0 0 12rpx 12rpx;
  background-color: #fff;

  .content {
    padding: 0 26rpx 0 40rpx;
    height: 66rpx;
    align-items: center;
    border-radius: 6rpx;
    border: 1px solid #eef1f4;

    .input {
      @include font(28rpx, 44rpx, #333, 400);
      flex: 1;
    }

    .time-text {
      color: #627e9a;
    }
  }
}

::v-deep {
  .u-calendar {
    padding-bottom: calc(20rpx);
  }
}
</style>
