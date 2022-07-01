<template>
  <view class="tabs-com wh flex-d-c">
    <view class="tabs-items" :style="customerStyle || {}">
      <view v-for="(item, index) in props.list" :key="index" :class="{ active: current == index }" class="tabs-item"
        @click="handleTapTab(item, index)">
        {{ typeof item == 'string' ? item : item.title }}
      </view>

      <i class="strip" :style="{
        background: stripColor || theme.color,
        width: Px(stripWidth),
        left: stripLeft,
      }" />
    </view>

    <view class="tabs-content" v-if="props.isContent !== false">
      <swiper class="tabs-swiper" :current="current" @change="onLoadTab">
        <swiper-item v-for="(item, index) in props.list" :key="index">
          <view class="wh" style="flex: 1">
            <slot :name="item" />
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, CSSProperties, reactive } from "vue";
import theme from '@config/theme'
import { Px } from "sview-ui";

interface Props {
  list: string[] | {
    id: number;
    title: string;
    minBtn: string;
    img?: string;
  }[]
  current: number;
  stripWidth?: number;
  stripColor?: string
  isContent?: boolean;
  customerStyle?: CSSProperties
}
const props = defineProps<Props>();

const loadTabList = reactive<Record<number, number>>({});

const stripWidth = computed(() => props.stripWidth || 40);
const stripLeft = computed(
  () =>
    `calc(100% / ${props.list.length * 2} * ${props.current * 2 + 1} - ${Px(
      stripWidth.value / 2
    )})`
);

const emits = defineEmits<{
  (e: "update:current", index: number): void;
  (e: "handleLoadTab", index: number, item?: Props['list'][0]): void;
}>();

function handleTapTab(item, index) {
  emits("update:current", index);
  emits("handleLoadTab", index, item);
}

function onLoadTab(e) {
  const index = typeof e == "number" ? e : e.detail.current;
  if (loadTabList[index] === undefined) {
    loadTabList[index] = 0;
  }
  handleTapTab({}, index);
}
</script>

<style lang="scss" scoped>
.tabs-com {
  .tabs-items {
    @include flex-w-w;
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
      @include font(32rpx, 44rpx, #627E9A, 400);
      flex: 1;
      transition: color 200ms;

      &.active {
        color: #272727;
        font-weight: 600;
      }
    }
  }

  .tabs-content {
    flex: 1;

    .tabs-swiper {
      @include wh;
    }
  }
}
</style>
