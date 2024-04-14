<template>
    <view class="home-menu-wrap justify-center">
        <view v-for="item in menuList" :key="item.id" class="home-menu-item flex-col align-center" @click="item.to">
            <view class="home-menu-item_icon flex-col align-center">
                <image class="shadow full" :src="imgPrefix(item.pic)" />
                <image class="img full" :src="imgPrefix(item.pic)" />
            </view>

            <text class="span">{{ item.title }}</text>
        </view>
    </view>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';


onMounted(() => {
})

const menuList = ref([
    {
        id: 1,
        pic: '/static/images/home/home_menu_1.png',
        title: '精彩课程',
    },
    {
        id: 2,
        pic: '/static/images/home/home_menu_2.png',
        title: '听力学习',
    },
    {
        id: 3,
        pic: '/static/images/home/home_menu_3.png',
        title: '单词学习',
    },
    {
        id: 4,
        pic: '/static/images/home/home_menu_4.png',
        title: '公告',
    },
])
</script>

<style lang='scss' scoped>
$_g: 43rpx;

.home-menu-wrap {
    @include wh(100%, 247rpx);
    padding: 53rpx 0;
    margin: 0 $_g;

}

.home-menu-item {
    $_w: 88rpx;

    margin: 0 $_g;
    width: $_w;

    .home-menu-item_icon {
        @include wh(100%, $_w);
        @include border(none, 33rpx);

        // .img {}

        .shadow {
            background: inherit;
            position: absolute;
            transform: translateY(50rpx);
            height: 50%;
            width: 67%;
            filter: blur(14rpx);
            z-index: 0;
        }
    }

    .span {
        @include font(28rpx, 28rpx, #1A2952, 600);
        margin-top: 26rpx;
        white-space: nowrap;
        text-align: center;
    }
}
</style>