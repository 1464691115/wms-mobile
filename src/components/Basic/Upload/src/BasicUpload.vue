<template>
  <uni-file-picker
    v-bind="$attrs"
    v-model="filePickerVal"
    :auto-upload="false"
    @success="(e) => handleChange(e)"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { isArray } from '@/utils/is'
import Icon from '@/components/Basic/Icon/src/Icon.vue'
import { get } from 'lodash-es'

defineOptions({
  options: { styleIsolation: 'shared' },
})

const props = defineProps()

const emits = defineEmits<{
  (e: 'change', value): void
  (e: 'update:value', value): void
}>()

onMounted(() => {})

const filePickerVal = ref()

function handleChange(value) {}
</script>

<style lang="scss" scoped>
::v-deep .uni-file-picker {
  padding: 5px;
}
</style>
