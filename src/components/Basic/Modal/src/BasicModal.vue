<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  ref,
  toRef,
  toRaw,
  watch,
  watchEffect,
  isRef,
  onMounted,
} from 'vue'
import Modal from './components/Modal.vue'
import { baseModalProps, BasePropsType } from './props'
import { ModalMethods } from './typings'
import _ from 'lodash-es'
import { useProhibitScrollPenetrate } from '@/utils/hooks/web/useProhibitScrollPenetrate'
import { isObject } from '@/utils/is'

onMounted(() => {
  if (instance) {
    emits('register', modalMethods, instance.uid)
  }
})

const props = defineProps(baseModalProps)
const emits = defineEmits<{
  (e: 'ok')
  (e: 'cancel')
  (e: 'maskClose')
  (e: 'update:show', val: boolean)
  (e: 'visible-change', val: boolean)
  (e: 'register', ...arg: any)
}>()

//TODO kesen: 2023-06-15  如果要开启禁止滚动需要在页面 第一行添加
/**
 * <page-meta :page-style="'overflow:' + (prohibitState ? 'hidden' : 'visible')"></page-meta>
 * ...
 * const { prohibitState } = useProhibitScrollPenetrate()
 */
const { openProhibit, closeProhibit } = useProhibitScrollPenetrate()

const modalMethods: ModalMethods = {
  setModalProps,
  emitVisible: undefined,
}

const instance = getCurrentInstance()

const visibleRef = ref(false)

//#region //? ************** props操作

let propsRef = ref<Partial<BasePropsType> | null>(null)

const getMergeProps = computed((): Recordable => {
  return {
    ...props,
    ...((toRaw(propsRef?.value) as any) || {}),
  }
})

// modal component does not need title and origin buttons
const getProps = computed(() => {
  const opt = {
    ...toRaw(getMergeProps.value),
    show: toRaw(visibleRef.value),
    cancelButtonProps: undefined,
  }
  return {
    ...opt,
    wrapClassName: toRef(getMergeProps.value, 'wrapClassName'),
  } as Partial<BasePropsType>
})

/**
 * @description: 设置modal参数
 */
function setModalProps(_props: Partial<BasePropsType>): void {
  if (!_props || !isObject(_props)) return

  // Keep the last setModalProps
  if (isRef(propsRef)) {
    propsRef.value = _.cloneDeep(Object.assign(propsRef.value || {}, _props))
  } else {
    propsRef = ref(_.cloneDeep(Object.assign(propsRef || {}, _props)))
  }

  if (Reflect.has(_props, 'show')) {
    visibleRef.value = !!_props.show
  }
}

//#endregion

watchEffect(() => {
  visibleRef.value = !!props.show
})

watch(
  () => visibleRef.value,
  (v) => {
    emits('visible-change', v)
    emits('update:show', v)

    //TODO kesen: 2023-06-15  处理页面禁止滚动
    if (v) {
      openProhibit()
    } else {
      closeProhibit()
      getProps.value.closeFunc?.()
    }

    instance && modalMethods.emitVisible?.(v, instance.uid)
  },
  {
    immediate: false,
  },
)

// 取消事件
async function handleCancel(e: Event) {
  e?.stopPropagation()

  emits('cancel')
}

// 确定事件
async function handleConfirm(e: Event) {
  e?.stopPropagation()

  emits('ok')
}

function handleClose() {
  visibleRef.value = false
}
</script>
<template>
  <Modal
    v-bind="getProps"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    @mask-close="() => emits('maskClose')"
    @close="handleClose"
  >
    <slot />
  </Modal>
</template>
<style lang="scss" scoped></style>
