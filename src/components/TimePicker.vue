<template>
  <view class="time-picker-com wh">
    <picker
      class="con"
      mode="date"
      :value="current"
      :fields="props.fields || 'day'"
      :start="props.start"
      :end="props.end || `${new Date()}`"
      :disabled="props.disabled"
      @change="bindTimeChange"
    >
      <view class="con-wrap" />
    </picker>
    <view class="wh" :class="{ pad: props.isPadding }">
      <slot name="default" :value="current" class="wh">
        <u-cell-group>
          <u-cell
            :title="title"
            :value="current || props.place || '请选择'"
            :arrow="false"
          />
        </u-cell-group>
      </slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  fields?: 'year' | 'month' | 'day'
  title?: string
  place?: string
  isPadding?: boolean
  start?: string
  end?: string
  disabled?: boolean
  value?: any
}

defineOptions({
  options: { styleIsolation: 'shared' },
})
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'change', value): void
  (e: 'update:value', value): void
}>()

const current = ref<string | null>(null)

watch(
  () => props.value,
  (pre) => {
    current.value = pre
  },
  { immediate: true },
)

function bindTimeChange(e) {
  const _i = e.detail.value
  emits('change', _i)
  emits('update:value', _i)
  current.value = _i
}
</script>

<style lang="scss" scoped>
.con {
  @include wh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  overflow: hidden;

  .con-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.time-picker-com {
  @include flex-center;
  position: relative;
  flex: 1;

  .pad {
    padding: 0 20rpx;
  }
}

::v-deep .scoped-ref {
  @include flex-center;
  @include wh;
  flex: 1;
}

::v-deep {
  .u-cell__body {
    padding-block: 30rpx !important;
  }

  .u-cell__value {
    @include font(32rpx, 32rpx, #333, 400);
  }
}
</style>
