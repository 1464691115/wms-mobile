<template>
  <view class="top-screen-wrap align-center">
  </view>
</template>

<script lang="ts" setup>
import to from '@/routes/to'
import { toHome } from '@/routes/toFn';
import { initStore } from '@/store'
import { onLoad } from '@dcloudio/uni-app'

onLoad(async (opt) => {
  await initStore()

  //TODO kesen: 2023-06-29  需要 encodeURIComponent 把地址转一下 比如 redirect=encodeURIComponent('/pages/offline-detail/index?id=3')
  if (opt?.redirect) {
    to({
      url: decodeURIComponent(opt.redirect),
    })
  } else {
    toHome()
  }
})
</script>

<style lang="scss" scoped>
.top-screen-wrap {
  width: 100vw;
  height: 100vh;
  background-color: #80d676;

  .img {
    @include wh(262rpx, 312rpx);
    margin: 0 auto;
    display: block;
  }
}
</style>
