<template>
  <view class="wh">2</view>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ApiErrorMsg } from "@/api/instanceof";
import LoadView from "@/layout/LoadView.vue";

/** 组件refs */
const loadViewRef = ref<InstanceType<typeof LoadView>>();

onMounted(async () => {
  try {
    loadViewRef.value?.complete();
  } catch (error) {
    if (error instanceof ApiErrorMsg) loadViewRef.value?.fail(error.msg);
    else loadViewRef.value?.complete();
  }
});

function onShow() {}

defineExpose({
  onShow,
});
</script>
<style lang="scss" scoped></style>
