<template>
  <view class="home-menu-wrap">
    <view
      v-for="item in menuList"
      :key="item.id"
      class="home-menu-item flex-col align-center"
      @tap="item.click?.()"
    >
      <view class="home-menu-item_icon flex-col align-center">
        <!-- <image class="shadow full" :src="imgPrefix(item.pic)" /> -->
        <image class="img full" :src="imgPrefix(item.pic)" />
      </view>

      <text class="span">{{ item.title }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ROUTES_URL } from '@/routes'
import to from '@/routes/to'
import { onMounted, ref } from 'vue'

onMounted(() => {})

const menuList = ref([
  {
    id: 1,
    pic: '/static/images/home/home_menu_1.png',
    title: '新增货品',
    click() {
      to({
        url: ROUTES_URL.NEW_PRODUCTS,
      })
    },
  },
  {
    id: 2,
    pic: '/static/images/home/home_menu_2.png',
    title: '扫一扫',
  },
  {
    id: 3,
    pic: '/static/images/home/home_menu_3.png',
    title: '单据列表',
    click() {
      to({
        url: ROUTES_URL.STOCK_LIST,
      })
    },
  },
  {
    id: 4,
    pic: '/static/images/home/home_menu_4.png',
    title: '入库',
    click() {
      to({
        url: ROUTES_URL.INBOUND_DOCUMENTS,
      })
    },
  },
  {
    id: 5,
    pic: '/static/images/home/home_menu_1.png',
    title: '出库',
  },
  {
    id: 6,
    pic: '/static/images/home/home_menu_2.png',
    title: '盘点',
  },
  {
    id: 7,
    pic: '/static/images/home/home_menu_3.png',
    title: '调拨',
  },
  {
    id: 8,
    pic: '/static/images/home/home_menu_4.png',
    title: '库存查询',
  },
])
</script>

<style lang="scss" scoped>
$_g: 26rpx;

.home-menu-wrap {
  @include houseGrid(4, 28rpx, 13rpx, home-menu-item);
  padding-bottom: 30rpx;
}

.home-menu-item {
  margin-top: 40rpx !important;

  .home-menu-item_icon {
    @include whSquare(130rpx);
    @include border(none, 33rpx);

    .img {
      background-color: #000;
    }

    // .shadow {
    //     background: inherit;
    //     position: absolute;
    //     transform: translateY(50rpx);
    //     height: 50%;
    //     width: 67%;
    //     filter: blur(14rpx);
    //     z-index: 0;
    // }
  }

  .span {
    @include font(28rpx, 28rpx, #1a2952, 600);
    margin-top: 20rpx;
    white-space: nowrap;
    text-align: center;
  }
}
</style>
