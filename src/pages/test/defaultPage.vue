<template>
  <view class="wrap">
    1
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showTime = ref(false);

setTimeout(() => {
  showTime.value = true
}, 400);
</script>

<style>
.wrap {
  width: 100%;
  height: auto;
}
</style>

