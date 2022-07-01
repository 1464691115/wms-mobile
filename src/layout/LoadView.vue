<template>
  <view class="load-view">
    <uni-transition
      :show="!LoadingShow"
      :styles="{ height: '100%', width: '100%', position: 'absolute' }"
    >
      <view class="load flex-center" :style="{ minHeight: Px(props.minHeight || 600) }">
        <view class="icon flex-d-c flex-center-a">
          <block v-if="data.loadingImage">
            <s-image :src="data.loadingImage" />
            <text class="load-text">{{ data.loadingText || "" }}</text>
          </block>
          <view v-else class="wh flex-center">
            <uni-load-more
              status="loading"
              iconType="circle"
              :color="theme.color"
              :contentText="{ contentrefresh: data.loadingText || '加载中' }"
            />
          </view>
        </view>
      </view>
    </uni-transition>
    <view :style="{ opacity: LoadingShow ? 1 : 0 }" v-if="data.setTimeShow">
      <slot />
    </view>
  </view>
</template>
<script lang="ts" setup>
//TODO kesen: 2022-05-13  show 是用作延迟动画的，实际加载完成是 setTimeShow
import { PAGE_LOAD_STATUS } from "@/enums";
import { onBeforeMount, reactive, ref } from "vue";
import baseImg from "sview-ui/components/empty/lib/baseImg";
import theme from "@config/theme";

const props = defineProps<{
  /** 初始是否加载 */
  initLoading?: boolean;
  minHeight?: number | string;
}>();

const data = reactive<{
  status: PAGE_LOAD_STATUS;
  loadingText: string;
  loadingImage: string;
  setTimeShow: boolean;
}>({} as any);

const LoadingShow = ref(false);

onBeforeMount(() => {
  if (props.initLoading == false) loading();
  else {
    data.setTimeShow = true;
    data.status = PAGE_LOAD_STATUS.SUCCESS;
  }
});

function complete() {
  data.setTimeShow = true;
  setTimeout(() => {
    LoadingShow.value = true;
    data.status = PAGE_LOAD_STATUS.SUCCESS;
  }, 300);
}
function fail(text = "") {
  data.status = PAGE_LOAD_STATUS.FAIL;
  data.loadingText = text || "页面加载失败";
  data.loadingImage = baseImg.page;
  LoadingShow.value = false;
}
function loading(text = "") {
  data.status = PAGE_LOAD_STATUS.LOADING;
  data.loadingText = text || "加载中";
  data.loadingImage = "";
  LoadingShow.value = false;
}

function setPageIf(is = true) {
  data.setTimeShow = is;
}

defineExpose({
  complete,
  fail,
  loading,
  setPageIf,
});
</script>

<style lang="scss" scoped>
.load-view {
  min-width: 100%;
  min-height: 100%;
  height: 100vh;

  .load {
    @include wh;
    background-color: $bgColor;
    z-index: 95;
    flex-direction: column;

    ::v-deep .uni-load-more {
      flex-direction: column;
      height: auto;
    }

    .icon {
      min-width: 66px;
      max-width: 70%;
      min-height: 66px;

      ::v-deep .s-image {
        width: 66px;
        height: 66px;
      }
    }

    ::v-deep .uni-load-more__text,
    .load-text {
      @include font(28rpx, 38rpx, #9c9c9c, 400);
      margin-top: 40rpx;
      text-align: center;
    }
  }

  & > .wh {
    transition: opacity 300ms;
  }
}

::v-deep .uni-load-more__text {
  white-space: nowrap;
}
</style>
