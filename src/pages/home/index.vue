<template>
    <view class="home-wrap">
        <view class="home-plant-wrap">
            <ToDosNum />
            <InventoryAlerts />
        </view>

        <HomeMenu />
    </view>
</template>

<script lang='ts' setup>
import HomeMenu from './components/HomeMenu.vue';
import InventoryAlerts from './components/InventoryAlerts.vue';
import ToDosNum from './components/ToDosNum.vue';


</script>

<style lang='scss' scoped>
.home-wrap {

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
}
</style>