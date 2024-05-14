<template>
  <view class="tabs-com wh flex-d-c">
    <view class="tabs-items" :style="customerStyle || {}">
      <view
        v-for="(item, index) in props.list"
        :key="index"
        :class="{ active: current == index }"
        class="tabs-item"
        @click="handleTapTab(index)"
      >
        {{ typeof item == 'string' ? item : item.name }}
      </view>

      <i
        class="strip"
        :style="{
          background: stripColor || APP_PRESET_COLOR,
          width: Px(stripWidth),
          left: stripLeft,
        }"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { APP_PRESET_COLOR } from '@/settings/designSetting'
import { Px } from '@/utils/global'
import { computed, CSSProperties } from 'vue'

interface Props {
  list: string[] | Array<Record<string | 'value' | 'name', any>>
  current: any
  stripWidth?: number
  stripColor?: string
  customerStyle?: CSSProperties
}
const props = defineProps<Props>()

const stripWidth = computed(() => props.stripWidth || 40)
const stripLeft = computed(
  () =>
    `calc(100% / ${props.list.length * 2} * ${props.current * 2 + 1} - ${Px(
      stripWidth.value / 2,
    )})`,
)

const emits = defineEmits<{
  (e: 'update:current', index: number): void
}>()

function handleTapTab(index) {
  emits('update:current', index)
}
</script>

<style lang="scss" scoped>
.tabs-com {
  .tabs-items {
    @include flex-wrap;
    position: relative;
    height: 100rpx;
    border-radius: 40rpx 40rpx 0 0;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;

    .strip {
      @include box(0, 0, 52rpx, 6rpx);
      position: absolute;
      left: calc(100% / 6 - 20rpx);
      bottom: 0;
      transition: left 300ms ease-in-out;
      background: $primary;
    }

    .tabs-item {
      @include flex-center;
      @include font(32rpx, 44rpx, #272727, 400);
      flex: 1;
      transition: color 200ms;

      &.active {
        color: #272727;
        font-weight: 600;
      }
    }
  }
}
</style>
