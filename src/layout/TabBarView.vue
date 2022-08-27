<template>
  <view class="wrap">
    <view class="content">
      <block v-for="(item, index) in slotList" :key="index">
        <view style="flex: 1" v-show="item.id == current">
          <slot :name="item.slot" />
        </view>
      </block>
      <slot />
    </view>
    <view
      class="footer-bar"
      :style="{
        minHeight: Px(theme.tabBarHeight || 70, 'px'),
        maxHeight: Px(theme.tabBarHeight || 70, 'px'),
      }"
    >
      <view
        class="foo-item"
        v-for="(item, index) in fooList"
        :key="index"
        :style="{
          color: attrs[selectCurrentId(item, current) ? 'selectedColor' : 'color'],
          fontSize: Px(attrs.fontSize || 22),
          width: `${100 / attrs.list.length}%`,
        }"
        @click="() => handleSwitchTab(item, index)"
      >
        <!-- 如果是特殊tabbar 占位 有定位 -->
        <view
          :style="{
            width: Px(attrs.iconWidth || 66),
            height: Px(attrs.iconWidth || 66),
          }"
          v-if="
            item['iconStyle'] &&
            item['iconStyle']?.position &&
            item['iconStyle']?.position == 'absolute'
          "
        />

        <view
          class="foo_icon"
          :style="
            assignStyle(
              {
                width: Px(getSize(item)),
                height: Px(getSize(item)),
              },
              item['iconStyle']
            )
          "
        >
          <view v-if="item.badge" class="min-item flex-center"
            ><text class="min-text">{{ item.badge > 99 ? 99 : item.badge }}</text></view
          >
          <BasicIcon
            :icon="
              item.iconfont[selectCurrentId(item, current) ? 'selectedText' : 'text']
            "
            :color="
              selectCurrentId(item, current)
                ? item.iconfont['selectedColor']
                : props['color']
            "
            :size="
              (item.iconfont && item.iconfont.fontSize) ||
              item.size ||
              attrs.iconWidth ||
              66
            "
            v-if="item.iconfont"
          />
          <s-image
            v-if="item.iconPath"
            :src="midButtonObj ? midButtonObj.img || '' : item.iconPath"
            mode="aspectFill"
          />
        </view>

        <view class="foo_text textEllipsis" :style="{ fontSize: Px(attrs.fontSize) }">
          {{ midButtonObj && item.tabBarId == -1 ? midButtonObj.title || "" : item.text }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { Px } from "sview-ui";
import type { tabBarType } from "@/routes/tabbar";
import theme from "@config/theme";
import BasicIcon from "@/components/Basic/Icon/src/BasicIcon.vue";

interface Props {
  slotList?: { slot; id }[];
  midButton?: boolean;
  current?: number;
  /** 自定义特殊tabbar */
  midButtonObj?: {
    /** 按钮图片 */
    img?: string;
    /** 按钮文字 */
    title?: string;
    /** 当前操作id */
    id?: number;
  };
}
const props = defineProps<Props>();
const attrs = useAttrs() as Omit<tabBarType, "midButton">;

const emit = defineEmits<{
  (e: "handleLoadTab", index: number): void;
  (e: "update:current", index: number): void;
}>();

const fooList = computed(() => {
  return attrs.list;
});

function assignStyle(obj = {}, ass = {}) {
  return Object.assign(obj, ass);
}
function selectCurrentId(t, f) {
  // return t.item.tabBarId == f;
  return t.tabBarId == f;
}
function getSize(item) {
  return item.size || attrs.iconWidth || 66;
}
function handleSwitchTab(_item, index) {
  emit("handleLoadTab", _item.tabBarId);

  if (props.midButton && _item.tabBarId == -1) return;
  emit("update:current", _item.tabBarId);
}
</script>

<style lang="scss" scoped>
.wrap {
  @include pageWrap;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.footer-bar {
  padding: 0 0 0 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px -8rpx 20rpx rgba(0, 0, 0, 0.04);
  z-index: 99;
  box-sizing: border-box;
}

.footer-bar .foo-item {
  position: relative;
  flex: 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-bar .foo_text {
  width: 100%;
  font-size: 28rpx;
  text-align: center;
  justify-self: flex-end;
}

.min-item {
  $size: 44rpx;
  @include messageRed($size);
  @include font(28rpx, 28rpx, #fff, 400);
  @include whSquare($size);
  position: absolute;
  top: calc($size / -2);
  right: calc($size / -2);
  z-index: 96;

  .min-text {
    position: absolute;
    z-index: 10;
  }

  &::after {
    top: 0;
    right: 0;
  }
}
</style>
