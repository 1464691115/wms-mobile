<template>
  <LoadView ref="loadViewRef"></LoadView>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import LoadView from "@/layout/LoadView.vue";
import { onShow } from "@dcloudio/uni-app";
import routes from "@/routes";

const loadViewRef = ref<InstanceType<typeof LoadView>>();

onShow(async () => {
  try {
    // 执行初始化 接口数据
  } catch (error) {
  } finally {
    // 跳转到路由权重第二个的页面
    setTimeout(() => {
      routes.length > 1 && uni.reLaunch({ url: `/${routes[1].path}` });
    }, 200);
  }
});
</script>
