<template>
    <view class="to-dos-num-wrap flex-col align-center">
        <view>待办事项</view>
        <view class="_num">{{ props.num || 0 }}</view>
    </view>
</template>

<script lang='ts' setup>
const props = defineProps<{
    num?: number
}>()
</script>

<style lang='scss' scoped>
.to-dos-num-wrap {
    color: #fff;
    flex: 1;

    ._num {
        text-wrap: nowrap;
        font-size: 40rpx;
        line-height: 70rpx;
    }
}
</style> 