/**
 * @description 禁止穿透组件
 */
import { computed, onUnmounted, ref } from 'vue'

const isProhibit = ref(false)

export function useProhibitScrollPenetrate() {
  onUnmounted(() => closeProhibit())

  function openProhibit() {
    isProhibit.value = true
  }

  function closeProhibit() {
    isProhibit.value = false
  }

  const prohibitState = computed(() => isProhibit.value)

  return {
    prohibitState,
    openProhibit,
    closeProhibit,
  }
}
