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

    <view class="stock-detail_footer">
      <view class="_btn">
        <Icon :icon="ICON_UNICODE.COPY" />
        复制
      </view>
      <view class="_btn">
        <Icon :icon="ICON_UNICODE.TUBIAO_SHANCHU" />
        删除
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Tabs from '@/components/Tabs/Tabs.vue'
import { ref } from 'vue'
import StockDetail from './components/StockDetail.vue'
import StockGoods from './components/StockGoods.vue'
import { onLoad } from '@dcloudio/uni-app'
import Icon from '@/components/Basic/Icon/src/Icon.vue'

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

const currentTabs = ref(1)
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
  background-color: #f3f4f8;

  .swiper-box {
    flex: 1;
  }

  .stock-detail_footer {
    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 114rpx;
    display: flex;
    align-items: center;

    box-shadow: 0px -4px 10px rgba(186, 186, 186, 0.2);
    background-color: #fff;

    ._btn {
      margin-left: 60rpx;

      color: #6e6e6e;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 4rpx;

      font-size: 20rpx;
    }
  }
}
</style>
