<template>
  <view class="basic-button" :class="[
    buttonProps.plain ? 'plain' : 'back',
    buttonProps.type && !buttonProps.plain && 'onPlain',
    buttonProps.type || 'info',
  ]" :style="buttonStyle">
    <slot v-if="props.loading" name="loading">
      <Icon class="loading-icon" color="#fff" :icon="ICON_UNICODE.LOADING" :size="32"/>
    </slot>
    <slot>
      {{ buttonProps.title || buttonProps.text || '' }}
    </slot>
  </view>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { useComponentsProps } from '../../hooks/useComponentsProps'
import { baseButtonProps, BaseButtonPropsType } from '../props'
import Icon from '@/components/Basic/Icon/src/Icon.vue';

const props = defineProps({
  ...baseButtonProps,
  customProps: {
    type: Object as PropType<BaseButtonPropsType>,
  },
})

const buttonProps = useComponentsProps(props)

const buttonStyle = computed<CSSProperties>(() => ({
  borderRadius:
    buttonProps.value.shape != 'square'
      ? (buttonProps.value.customStyle &&
        buttonProps.value.customStyle.height) ||
      `80px`
      : 'none',
  opacity: buttonProps.value.disabled === true ? 0.4 : 1,
  cursor: buttonProps.value.disabled === true ? 'not-allowed' : 'pointer',
  ...(buttonProps.value.customStyle || {}),
}))
</script>
<style lang="scss" scoped>
$success: #4cd964;
$warning: #f0ad4e;
$error: #dd524d;

.basic-button {
  width: 100%;
  height: 80rpx;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: all 0.15s ease-out;

  &:active {
    opacity: 0.6 !important;
  }
}

.loading-icon {
  margin-right: 20rpx;
  animation: loading 1.5s infinite;
}

.basic-button.back {
  color: #000;
}

.info {
  color: #909399;
  border-color: rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0);
}

.primary {
  color: $primary;
  border-color: $primary;
  background: $primary;
}

.success {
  color: $success;
  border-color: $success;
  background: $success;
}

.warning {
  color: $warning;
  border-color: $warning;
  background: $warning;
}

.error {
  color: $error;
  border-color: $error;
  background: $error;
}

.basic-button.plain {
  background: rgba(255, 255, 255, 0);
}

.basic-button.onPlain {
  color: #fff;
}
</style>
