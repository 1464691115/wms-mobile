<script lang="ts" setup>
import Icon from '@/components/Basic/Icon/src/Icon.vue'
import { onMounted, reactive, watch } from 'vue'
import { baseModalProps } from '../props'

const props = defineProps(baseModalProps)

const emits = defineEmits<{
  (e: 'cancel', ev: Event)
  (e: 'confirm', ev: Event)
  (e: 'close', ev?: Event)
  (e: 'maskClose', ev?: Event)
  (e: 'update:isOpen', ev: boolean)
}>()

onMounted(() => {
  modalData.isOpen = !!props.show
})

const modalData = reactive({
  isOpen: false,
})

watch(
  () => props.show,
  (val) => {
    modalData.isOpen = !!val
  },
)

// function bindTouchmove() {}
function clickLeft(e) {
  console.log(e)

  emits('cancel', e)
  closeModal()
}
function clickRight(e) {
  emits('confirm', e)
  closeModal()
}
function clickMask() {
  if (props.maskClosable && !props.isCloseIcon) {
    closeModal()
    emits('maskClose')
  }
}
function closeModal() {
  modalData.isOpen = false
  emits('update:isOpen', false)
  emits('close')
}
</script>
<template>
  <view class="neil-modal" :class="{ 'neil-modal--show': modalData.isOpen }">
    <view v-if="props.mask" class="neil-modal__mask" @click="clickMask"></view>
    <view class="neil-modal__container" v-if="modalData.isOpen">
      <view class="neil-modal__header" v-if="props.title">
        {{ props.title }}
      </view>
      <view
        class="neil-modal__content"
        :class="props.content ? 'neil-modal--padding' : ''"
        :style="{ textAlign: props.align }"
      >
        <template v-if="props.content">
          <text class="modal-content">{{ props.content }}</text>
        </template>
        <template v-else>
          <slot v-if="!$slots.content" name="default" />
          <slot v-else name="content" />
        </template>
      </view>
      <view v-if="props.isFooter" class="neil-modal__footer">
        <view
          v-if="props.showCancel"
          class="neil-modal__footer-left"
          @click="clickLeft"
          :style="{ color: props.cancelColor }"
          hover-class="neil-modal__footer-hover"
          :hover-start-time="20"
          :hover-stay-time="70"
        >
          {{ props.cancelText }}
        </view>
        <view
          class="neil-modal__footer-right"
          @click="clickRight"
          :style="{ color: props.confirmColor }"
          hover-class="neil-modal__footer-hover"
          :hover-start-time="20"
          :hover-stay-time="70"
        >
          {{ props.confirmText }}
        </view>
      </view>

      <view v-if="props.isCloseIcon" class="a-close" @click="closeModal">
        <Icon :icon="ICON_UNICODE.CLOSE" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$bg-color-mask: rgba(0, 0, 0, 0.5); //遮罩颜色
$bg-color-hover: #f1f1f1; //点击状态颜色

.neil-modal {
  position: fixed;
  visibility: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: visibility 100ms ease-in;

  &.neil-modal--show {
    visibility: visible;
  }

  &__header {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 18upx 24upx;
    line-height: 1.5;
    color: #333;
    font-size: 32upx;
    text-align: center;

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #e5e5e5;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }

  &__container {
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.3s;
    width: 650upx;
    border-radius: 20upx;
    background-color: #fff;
    overflow: hidden;
    opacity: 0;
    transition: opacity 100ms ease-in;
  }

  &__content {
    padding: 30upx 40upx;
    position: relative;
    color: #333;
    font-size: 28upx;
    box-sizing: border-box;
    line-height: 1.5;

    &::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: -1px;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #e5e5e5;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }

  &__footer {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
    font-size: 32upx;
    display: flex;
    flex-direction: row;

    &-left,
    &-right {
      position: relative;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 88upx;
      font-size: 28upx;
      line-height: 88upx;
      text-align: center;
      background-color: #fff;
      color: #333;
    }

    &-right {
      color: #007aff;
    }

    &-left::after {
      content: ' ';
      position: absolute;
      right: -1px;
      top: 0;
      width: 1px;
      bottom: 0;
      border-right: 1px solid #e5e5e5;
      transform-origin: 0 0;
      transform: scaleX(0.5);
    }

    &-hover {
      background-color: $bg-color-hover;
    }
  }

  &__mask {
    display: block;
    position: absolute;
    z-index: 998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $bg-color-mask;
    opacity: 0;
    transition: opacity 100ms ease-in;

    &.neil-modal--show {
      opacity: 1;
    }
  }

  &--padding {
    padding: 32upx 24upx;
    min-height: 90upx;
  }

  &--show {
    .neil-modal__container,
    .neil-modal__mask {
      opacity: 1;
    }
  }

  .a-close {
    position: absolute;
    top: 30upx;
    right: 20upx;
  }
}
</style>
