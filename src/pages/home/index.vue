<template>
    <view class="home-wrap">
        <view class="home-plant-wrap">
            <ToDosNum />
            <InventoryAlerts />
        </view>




        <view class="home-menu">
            <uni-section title="库存管理" type="line" titleFontSize="18px" />
            <HomeMenu />
        </view>

    </view>
</template>

<script lang='ts' setup>
import HomeMenu from './components/HomeMenu.vue';
import InventoryAlerts from './components/InventoryAlerts.vue';
import ToDosNum from './components/ToDosNum.vue';


</script>

<style lang='scss' scoped>
.home-wrap {
    background-color: #F2F3F7;

    .home-plant-wrap {
        position: relative;
        width: 100%;
        height: 180rpx;
        background-color: $primary;
        display: flex;
        align-items: center;

        &::after {
            content: "";
            position: absolute;
            left: calc(50% - 1.5rpx);
            width: 3rpx;
            height: 80rpx;
            background-color: #fff;
        }
    }


    .home-menu {
        padding: 20rpx 0 0;
        width: 100%;

        background-color: #fff;

        ::v-deep .uni-section-header {
            padding-left: 28rpx;
            padding-bottom: 0;
        }
    }
}
</style>