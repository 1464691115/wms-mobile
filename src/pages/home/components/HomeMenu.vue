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
        <component :is="item.pic" />
      </view>

      <text class="span">{{ item.title }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ICON_UNICODE } from '@/components/Basic/Icon'
import Icon from '@/components/Basic/Icon/src/Icon.vue'
import { ROUTES_URL } from '@/routes'
import to from '@/routes/to'
import { h, onMounted, ref } from 'vue'

onMounted(() => {})

const menuList = ref([
  {
    id: 1,
    pic: h(Icon, {
      icon: ICON_UNICODE.YUNDANHUOPIN,
      size: 55,
    }),
    title: '新增货品',
    click() {
      to({
        url: ROUTES_URL.NEW_PRODUCTS,
      })
    },
  },
  {
    id: 2,
    pic: h(Icon, { icon: ICON_UNICODE.SAOYISAO, size: 55 }),
    title: '扫一扫',
  },
  {
    id: 3,
    pic: h(Icon, { icon: ICON_UNICODE.DANJUGUANLI, size: 85 }),
    title: '单据列表',
    click() {
      to({
        url: ROUTES_URL.STOCK_LIST,
      })
    },
  },
  {
    id: 4,
    pic: h(Icon, { icon: ICON_UNICODE.YUEKUCHAXUN, size: 80 }),
    title: '库存查询',
    click() {
      to({
        url: ROUTES_URL.OUTBOUND_SHIPMENTS,
      })
    },
  },
  {
    id: 5,
    pic: h(Icon, { icon: ICON_UNICODE.RUKUGUANLI, size: 80 }),
    title: '入库',
    click() {
      to({
        url: ROUTES_URL.INBOUND_DOCUMENTS,
      })
    },
  },
  {
    id: 6,
    pic: h(Icon, { icon: ICON_UNICODE.CHUKUGUANLI, size: 80 }),
    title: '出库',
    click() {
      to({
        url: ROUTES_URL.OUTBOUND_SHIPMENTS,
      })
    },
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
    @include whSquare(100rpx);
    @include border(none, 33rpx);

    display: flex;
    align-items: center;
    justify-content: center;

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
    white-space: nowrap;
    text-align: center;
  }
}
</style>
