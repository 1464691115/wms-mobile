<template>
  <view class="selector-picker-com full">
    <picker
      class="con"
      mode="selector"
      :range="options"
      :value="index == -1 ? 0 : index"
      range-key="label"
      @change="bindTimeChange"
    >
      <view class="con-wrap" />
    </picker>
    <view class="select-picker-con full align-center">
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
          {{
            index !== null && options.length && options[index]
              ? options[index].label
              : props.place || '请选择'
          }}
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

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { ApiSelectItemType, apiSelectProps } from '../props'
import { isArray } from '@/utils/is'
import Icon from '@/components/Basic/Icon/src/Icon.vue'

defineOptions({
  options: { styleIsolation: 'shared' },
})

const props = defineProps(apiSelectProps)

const emits = defineEmits<{
  (e: 'change', value, record: { index; item; value }): void
  (e: 'update:value', item): void
}>()

onMounted(() => {
  if (!props.immediate) return

  getListData()
})

const listData = ref([] as ApiSelectItemType[] | Object)

const options = computed<ApiSelectItemType[]>(() => {
  const self_list = listData.value
  const { labelField, valueField } = props

  if (self_list === undefined) return []

  if (isArray(self_list)) {
    return self_list.map((el) => ({
      label: el[labelField],
      value: el[valueField],
      disabled: el.disabled,
    }))
  } else {
    return Object.keys(self_list).map((key) => ({
      label: self_list[key][labelField],
      value: self_list[key][valueField],
      disabled: self_list[key].disabled,
    }))
  }
})

watch(
  () => props.params,
  () => {
    getListData()
  },
  {
    deep: true,
  },
)

watch(
  () => props.list,
  (val) => {
    if (!props.api || !listData.value) {
      listData.value = val || []
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

const index = computed(() =>
  options.value.findIndex((el) => el.value == props.value),
)

function bindTimeChange(e) {
  const _i = e.detail.value

  const _val = options.value[_i].value

  emits('change', _val, { index: _i, item: options.value[_i], value: _val })
  emits('update:value', _val)
}

function getListData() {
  const { api, params, resultField } = props

  if (typeof api != 'function') return

  api(params || {}).then((res) => {
    listData.value = resultField ? res[resultField] : (res as typeof res)
  })
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
