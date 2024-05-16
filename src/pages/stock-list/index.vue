<template>
  <view class="stock-list stock-list-wrap">
    <Tabs v-model:current="currentTabs" :list="tabsList" />

    <swiper class="swiper-box" :current="currentTabs" @change="animationfinish">
      <swiper-item
        v-for="item in tabsList"
        class="swiper-item"
        :key="item.value"
      >
        <component :is="item.component" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import Tabs from '@/components/Tabs/Tabs.vue'
import { ref } from 'vue'
import StockEntry from './components/StockEntry.vue'
import StockOut from './components/StockOut.vue'

const tabsList = [
  {
    name: '入库单',
    value: 'entry',
    component: StockEntry,
  },
  {
    name: '出库单',
    value: 'out',
    component: StockOut,
  },
]

const currentTabs = ref(0)

function animationfinish({ detail }) {
  currentTabs.value = detail.current
}
</script>

<style lang="scss" scoped>
.stock-list {
  height: 100%;

  display: flex;
  flex-direction: column;

  .swiper-box {
    flex: 1;
  }
}
</style>
