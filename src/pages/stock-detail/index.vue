<template>
  <view class="stock-list stock-list-wrap">
    <Tabs v-model:current="currentTabs" :list="tabsList" />

    <swiper class="swiper-box" :current="currentTabs" @change="animationfinish">
      <swiper-item
        v-for="item in tabsList"
        class="swiper-item"
        :key="item.value"
      >
        <component :is="item.component" :sid="sid" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import Tabs from '@/components/Tabs/Tabs.vue'
import { ref } from 'vue'
import StockDetail from './components/StockDetail.vue'
import StockGoods from './components/StockGoods.vue'
import { onLoad } from '@dcloudio/uni-app'

const tabsList = [
  {
    name: '单据信息',
    value: 'detail',
    component: StockDetail,
  },
  {
    name: '货品明细',
    value: 'goods',
    component: StockGoods,
  },
]

onLoad((opt) => {
  if (opt?.sid) {
    sid.value = opt.sid
  }
})

const currentTabs = ref(0)
const sid = ref()

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
