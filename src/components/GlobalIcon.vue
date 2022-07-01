<template>
  <i
    class="font-icon"
    v-html="icon"
    :style="{
      fontSize: Px(props.size || 48),
      width:  Px(props.size || 48),
      height:  Px(props.size || 48),
      color: props.color || colorTheme,
    }"
  />
</template>

<script lang="ts" setup>
import theme from "@config/theme";
import { Px } from "sview-ui";
import { computed } from "vue";
import { ICON_UNICODE, ICON_UNICODE_VALUE } from "@/enums";

interface Props {
  icon?: ICON_UNICODE_VALUE;
  size?: string | number;
  color?: string;
}

const props = defineProps<Props>();

const colorTheme = computed(() => theme.color);
const icon = computed(() => {
  if (!props.icon) return "";
  return ICON_UNICODE[props.icon] ? ICON_UNICODE[props.icon] : props.icon;
});
</script>

<style scoped>
.font-icon {
  transition: all 0.3s;
}
</style>
