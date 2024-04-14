<template>
    <view class="inventory-alerts-wrap flex-col align-center">
        <view>库存预警</view>
        <view class="_num">{{ props.num || 0 }}</view>
    </view>
</template>

<script lang='ts' setup>
const props = defineProps<{
    num?: number
}>()
</script>

<style lang='scss' scoped>
.inventory-alerts-wrap {
    color: #fff;
    flex: 1;

    ._num {
        text-wrap: nowrap;
        font-size: 40rpx;
        line-height: 70rpx;
    }
}
</style> 