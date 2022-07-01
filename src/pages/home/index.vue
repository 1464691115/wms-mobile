<template>
  <TabBarView
    v-bind="tabbarRefJson"
    v-model:current="tabBarIndex"
    :slotList="tabBarList"
    midButton
    @handleLoadTab="handleLoadTab"
  >
    <!-- 微信插槽兼容  -->
    // #ifdef MP
    <block v-for="(_item, index) in tabBarList" :key="index">
      <view v-if="loadTabList[_item.id] !== undefined" :slot="_item.slot" class="wh">
        <TabBar1 v-if="_item.id == 0" :ref="(el) => el && (tabBarRefs[_item.id] = el)" />
        <TabBar2 v-if="_item.id == 1" :ref="(el) => el && (tabBarRefs[_item.id] = el)" />
      </view>
    </block>
    // #endif
  </TabBarView>
</template>
<script lang="ts" setup>
import tabbarJson from "@/routes/tabbar";

import TabBarView from "@/layout/TabBarView.vue";
import TabBar1 from "./tab1/index.vue";
import TabBar2 from "./tab2/index.vue";
import { nextTick, onBeforeUpdate, reactive, ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

const tabBarIndex = ref(0);

const loadTabList = reactive({ [tabBarIndex.value]: 0 });
const tabBarList = reactive(
  tabbarJson.list.reduce<{ slot; id }[]>(
    (pre, el) =>
      el.tabBarId != -1
        ? pre.concat({ slot: `tabbar${el.tabBarId}`, id: el.tabBarId })
        : pre,
    []
  )
);
const tabbarRefJson = reactive(tabbarJson);

/** 组件refs */
const tabBarRefs = ref<any>([]);

onShow(() => {
  for (let index = 0; index < tabBarList.length; index++) {
    const element = tabBarList[index];
    if (tabBarIndex.value == element.id) {
      const refs = tabBarRefs.value[element.id];

      if (refs) refs.onShow && refs.onShow();
    }
  }
});

// 确保在每次更新之前重置ref
onBeforeUpdate(() => {
  tabBarRefs.value = [];
});

function handleLoadTab(id) {
  //? 特殊的tabbar点击
  if (id === -1) {
    return;
  }

  if (!loadTabList[id]) loadTabList[id] = id;
  nextTick(() => {
    const refs = tabBarRefs.value[id];
    if (refs) refs.onShow && refs.onShow();
  });
}
</script>
<style lang="scss" scoped></style>
