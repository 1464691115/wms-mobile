<template>
  <view class="get-code-page">
    <text @click="copyCode">code: {{ code }}</text>
    <button @click="getUserInfo">获取个人信息</button>
  </view>
</template>
<script lang="ts" setup>
import { showToast } from 'sview-ui';
import { onMounted, ref } from 'vue';

const code = ref('')
onMounted(() => {
  uni.login({
    provider: "weixin",
    success(res) {
      console.log(res);

      code.value = res.code;
    }
  })
})

function copyCode() {
  uni.setClipboardData({
    data: code.value,
    success: (result) => {  
      showToast("复制成功");
    },
    fail: (error) => { },
  });
}

function getUserInfo() {
  uni.getUserProfile({
    desc: "测试获取用户信息",
    success: (res) => {
      console.log(res);
    },
    fail: (error) => {
      console.log(error);
    },
  });
}
</script>
<style lang="scss" scoped>
.get-code-page {
  // @include pageWrap;
}
</style>
