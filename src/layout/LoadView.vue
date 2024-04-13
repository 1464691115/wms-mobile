<template>
  <view class="load-view">
    <uni-transition
      :show="!show"
      :styles="{ height: '100%', width: '100%', position: 'absolute' }"
    >
      <view
        class="load flex-center"
        :style="{
          minHeight: Px(props.minHeight || 600),
          ...(props.loadStyle || {}),
        }"
      >
        <view class="icon">
          <image v-if="data.loadingImage" :src="imgPrefix(data.loadingImage)" />
          <view v-else class="loading-animation full flex-center">
            <Icon :icon="ICON_UNICODE.LOADING" :size="60" />
          </view>
        </view>
        <view class="text">{{ data.loadingText || '' }}</view>
      </view>
    </uni-transition>
    <view
      class="full"
      :style="{ opacity: show ? 1 : 0 }"
      v-if="data.setTimeShow"
    >
      <slot />
    </view>
  </view>
</template>
<script lang="ts" setup>
//TODO kesen: 2022-05-13  show 是用作延迟动画的，实际加载完成是 setTimeShow
import { computed, CSSProperties, onBeforeMount, reactive } from 'vue'
import Icon from '@/components/Basic/Icon/src/Icon.vue'
enum PAGE_LOAD_STATUS {
  SUCCESS,
  FAIL,
  LOADING,
}

const props = defineProps<{
  /** 初始是否加载 */
  initLoading?: boolean
  minHeight?: number | string
  loadStyle?: CSSProperties
  /** 是否加载完成 */
  isLoaded?: boolean
}>()

const data = reactive<{
  status: PAGE_LOAD_STATUS
  loadingText: string
  loadingImage: string
  setTimeShow: boolean
}>({} as any)

const show = computed(() => {
  if (props.isLoaded === true) {
    complete()
  } else if (data.status != PAGE_LOAD_STATUS.FAIL) {
    loading()
  }
  return data.status == PAGE_LOAD_STATUS.SUCCESS
})

onBeforeMount(() => {
  if (props.initLoading == false) loading()
  else {
    data.setTimeShow = true
    data.status = PAGE_LOAD_STATUS.SUCCESS
  }
})

function complete() {
  data.setTimeShow = true
  setTimeout(() => {
    data.status = PAGE_LOAD_STATUS.SUCCESS
  }, 300)
}
function fail(text = '') {
  data.status = PAGE_LOAD_STATUS.FAIL
  data.loadingText = text || '页面加载失败'
}
function loading(text = '') {
  data.status = PAGE_LOAD_STATUS.LOADING
  data.loadingText = text || ''
  data.loadingImage = ''
}

function setPageIf() {
  data.setTimeShow = true
}

defineExpose({
  complete,
  fail,
  loading,
  setPageIf,
})
</script>

<style lang="scss" scoped>
.load-view {
  @include wh(100%, 100%);

  .load {
    @include wh;
    z-index: 95;
    flex-direction: column;

    .icon {
      @include whSquare(66px);
    }

    .text {
      @include font(38rpx, 38rpx, #9c9c9c, 400);
      margin-top: 40rpx;

      width: 100%;
      text-align: center;
    }
  }

  & > .wh {
    transition: opacity 300ms;
  }
}
</style>
