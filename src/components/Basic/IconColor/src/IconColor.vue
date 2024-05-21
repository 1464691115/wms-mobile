<template>
  <span
    class="iconcolor"
    v-html="icon"
    :style="{
      fontSize: Px(props.size || 48),
      width: Px(props.size || 48),
      height: Px(props.size || 48),
      color: props.color || APP_PRESET_COLOR,
    }"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ICON_COLOR_UNICODE, ICON_COLOR_UNICODE_VALUE } from '../index'
import { APP_PRESET_COLOR } from '@/settings/designSetting'

interface Props {
  icon?: ICON_COLOR_UNICODE_VALUE
  size?: string | number
  color?: string
}

const props = defineProps<Props>()

const icon = computed(() => {
  if (!props.icon) return ''
  return ICON_COLOR_UNICODE[props.icon] ? ICON_COLOR_UNICODE[props.icon] : props.icon
})
</script>

<style scoped>
.iconcolor {
  transition: all 0.2s;
}
</style>
