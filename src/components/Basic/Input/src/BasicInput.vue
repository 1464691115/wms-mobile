<template>
  <view
    class="basic-input"
    :class="{
      'is-disabled': inputDisabledClass,
      'basic-input-suffix': inputSuffixClass,
      'basic-input-prefix': inputPrefixClass,
    }"
  >
    <view
      v-if="inputProps.textPrepend || slots.prepend"
      class="basic-input_group-prepend basic-input_border-append"
      @click.stop="(e) => emits('clickPrepend', e)"
    >
      <slot name="prepend">
        {{ inputProps.textPrepend || '' }}
      </slot>
    </view>

    <view
      class="basic-input_group-content"
      :class="{
        'basic-input_inner-focus': isFocus,
        'basic-input_inner-border-none': inputProps.inputBorder === false,
        'basic-input_border-prepend': borderPrependClass,
        'basic-input_border-append': borderAppendClass,
      }"
    >
      <view v-if="slots.prefix || inputProps.iconPrefix" class="prefix_group">
        <slot name="prefix">
          <Icon
            :icon="inputProps.iconPrefix || ICON_UNICODE.SEARCH"
            size="26px"
            color="#999"
            @tap.stop="handlePrefixIconClick"
          />
        </slot>
      </view>

      <input
        class="basic-input_inner"
        :value="props.modelValue"
        :password="inputProps.password"
        :placeholder="inputProps.placeholder || ''"
        :disabled="inputDisabledClass"
        :maxlength="inputProps.maxlength || -1"
        :minlength="inputProps.minlength || 0"
        :autocomplete="inputProps.autocomplete || 'on'"
        :name="inputProps.name || ''"
        :readonly="inputProps.readonly || false"
        :focus="inputProps.focus || false"
        :style="inputProps.inputStyle"
        :type="inputProps.type"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @input="handleInput"
        @confirm="handleConfirm"
      />

      <view v-if="inputSuffixClass" class="suffix_group">
        <slot name="suffix">
          <Icon
            :icon="inputProps.iconSuffix || ICON_UNICODE.CLOSE"
            size="26px"
            color="#999"
            @tap.stop="handleSuffixIconClick"
          />
        </slot>
      </view>
    </view>

    <view
      v-if="inputProps.textAppend || slots.append"
      class="basic-input_group-append basic-input_border-prepend"
      @click.stop="(e) => emits('clickAppend', e)"
    >
      <slot name="append">
        {{ inputProps.textAppend || '' }}
      </slot>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, PropType, ref, useSlots } from 'vue'
import { useComponentsProps } from '../../hooks/useComponentsProps'
import Icon from '../../Icon/src/Icon.vue'
import { baseSInputProps, BaseSInputProps } from './props'

const props = defineProps({
  ...baseSInputProps,
  customProps: {
    type: Object as PropType<BaseSInputProps>,
    default: () => ({}),
  },
})

const emits = defineEmits<{
  (e: 'change', val: Event)
  (e: 'confirm', val: BaseSInputProps['modelValue'])
  (e: 'clickSuffix', val: Event)
  (e: 'clickPrefix', val: Event)
  (e: 'clickPrepend', val: Event)
  (e: 'clickAppend', val: Event)
  (e: 'update:modelValue', val: BaseSInputProps['modelValue'])
}>()
const slots = useSlots()

/** input是否获取到焦点 */
const isFocus = ref(false)

const inputProps = useComponentsProps({ ...props, ...props.customProps })

/** 禁用 */
const inputDisabledClass = computed(() => inputProps.value.disabled === true)
/** 是否使用左侧图标类（suffix */
const inputPrefixClass = computed(
  () => !!inputProps.value.iconPrefix || !!slots.prefix,
)
/** 是否使用右侧图标类（suffix */
const inputSuffixClass = computed(
  () =>
    !!inputProps.value.iconSuffix ||
    (inputProps.value.clearable && props.modelValue!?.toString().length > 0) ||
    !!slots.suffix,
)
/** input左上下边框圆角是否为0 */
const borderPrependClass = computed(
  () => slots.prepend || inputProps.value.textPrepend,
)
/** input右上下边框圆角是否为0 */
const borderAppendClass = computed(
  () => slots.append || inputProps.value.textAppend,
)

function handleInput(e) {
  const event = e?.detail?.value || e?.target?.value
  emits('change', e)
  emits('update:modelValue', event)
}

function handleConfirm(e) {
  const val = e?.detail?.value || e?.target?.value
  handleInput(e)
  emits('confirm', val)
}

function handleSuffixIconClick(e) {
  /** 如果有后置图标 */
  if (inputProps.value.iconSuffix) emits('clickSuffix', e)
  else if (inputProps.value.clearable) emits('update:modelValue', '')
}

function handlePrefixIconClick(e) {
  /** 如果有前置图标 */
  if (inputProps.value.iconSuffix) emits('clickPrefix', e)
}
</script>
<style lang="scss" scoped>
$_prefix: basic-input;
$INPUT_HEIGHT: 40px;

.#{$_prefix} {
  position: relative;
  width: 100%;
  font-size: 14px;
  display: flex;

  .#{$_prefix}_group-content {
    position: relative;
    width: auto;
    height: $INPUT_HEIGHT;
    flex: 1;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &.#{$_prefix}_inner-focus {
      border-color: $primary;
    }

    &.#{$_prefix}_inner-border-none {
      border-width: 0;
    }
  }

  .#{$_prefix}_inner {
    padding: 0 15px;
    width: 100%;
    height: 100%;
    line-height: 100%;
    color: #333;
    border: none;
    box-sizing: border-box;
    outline: none;
    font-size: 14px;
    transition: background 0.2s;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #b5bece;
  }

  &.is-disabled {
    cursor: not-allowed;

    .#{$_prefix}_inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }

    ::v-deep .uni-input-input:disabled {
      cursor: not-allowed;
    }
  }

  &.#{$_prefix}-suffix {
    .#{$_prefix}_inner {
      padding-right: 30px;
    }
  }

  &.#{$_prefix}-prefix {
    .#{$_prefix}_inner {
      padding-left: 30px;
    }
  }

  .prefix_group,
  .suffix_group {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    display: flex;
    justify-content: center;
  }

  .prefix_group {
    left: 0;
  }

  .suffix_group {
    right: 0;
    cursor: pointer;
  }

  .#{$_prefix}_group-prepend,
  .#{$_prefix}_group-append {
    width: auto;
    height: $INPUT_HEIGHT;
    background-color: #f5f7fa;
    color: #909399;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 20px;
    white-space: nowrap;
    box-sizing: border-box;
    line-height: calc($INPUT_HEIGHT - 2px);
    text-align: center;
    cursor: pointer;
  }

  .#{$_prefix}_border-prepend {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &.#{$_prefix}_group-append {
      border-left: 0;
    }
  }

  .#{$_prefix}_border-append {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    &.#{$_prefix}_group-prepend {
      border-right: 0;
    }
  }
}
</style>
