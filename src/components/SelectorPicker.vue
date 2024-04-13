<template>
  <view class="selector-picker-com full">
    <picker
      class="con"
      mode="selector"
      :range="options"
      :value="index == -1 ? 0 : index"
      :range-key="defineRangeTitle"
      @change="bindTimeChange"
    >
      <view class="con-wrap" />
    </picker>
    <view
      class="select-picker-con full align-center"
      :class="{ pad: props.isPadding }"
    >
      <slot
        name="default"
        :index="index"
        :value="props.value"
        :item="index !== null && options[index]"
      >
        <view
          class="select-picker-txt"
          :class="
            (typeof index !== 'number' || index === -1) &&
            'selector-picker-place'
          "
        >
          {{ resultRenderValue(options) }}
        </view>
      </slot>
      <Icon
        v-if="isRightIcon === true"
        :icon="ICON_UNICODE.ARROW_RIGHT_1"
        :size="44"
        color="#c0bdc1"
      />
    </view>
  </view>
</template>

<script
  lang="ts"
  setup
  generic="K extends ObjectKeyType = 'id', V extends ObjectKeyType = 'title'"
>
import { computed, unref } from 'vue'
import Icon from './Basic/Icon/src/Icon.vue'

defineOptions({
  options: { styleIsolation: 'shared' },
})

const props = defineProps<{
  title?: String
  place?: string
  isPadding?: boolean
  list: any[] | Record<any, any>
  rangeLabel?: string
  rangeId?: string
  value?: any
  /** 是否显示右侧的按钮 */
  isRightIcon?: boolean
}>()

const emits = defineEmits<{
  (e: 'change', { index, item, value }): void
  (e: 'update:value', item): void
}>()

const options = computed<any[]>(() => {
  if (!props.list) return []
  return Array.isArray(props.list)
    ? props.list
    : Object.keys(props.list).map((key) => ({
        [defineRangeValue.value]: key,
        [defineRangeTitle.value]: props.list[key],
      }))
})

const index = computed(() =>
  options.value.findIndex(
    (el) =>
      (defineRangeValue.value ? el[defineRangeValue.value] : el) == props.value,
  ),
)
/** 标题 字段 */
const defineRangeTitle = computed(() =>
  props.rangeLabel === null ? '' : props.rangeLabel || 'title',
)
/** 值 字段 */
const defineRangeValue = computed(() =>
  props.rangeId === null ? '' : props.rangeId || 'id',
)

function bindTimeChange(e) {
  const _i = e.detail.value

  const _val = defineRangeValue.value
    ? options.value[_i][defineRangeValue.value]
    : options.value[_i]

  emits('change', { index: _i, item: options.value[_i], value: _val })
  emits('update:value', _val)
}

function resultRenderValue(options) {
  const self_index = unref(index)

  return self_index !== null && options.length && options[self_index]
    ? defineRangeTitle.value
      ? options[self_index][defineRangeTitle.value]
      : options[self_index]
    : props.place || '请选择'
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

.selector-picker-com {
  @include align-center;
  position: relative;
  flex: 1;

  .selector-picker-place {
    color: #c0bdc1;
  }

  .pad {
    padding: 0 20rpx;
  }
}

::v-deep .scoped-ref {
  @include flex-center;
  @include wh;
  flex: 1;
}

::v-deep .u-cell__body {
  padding-block: 30rpx !important;
}

::v-deep .u-cell .u-cell__value {
  @include font(32rpx, 32rpx, #333, 400);
}
</style>
