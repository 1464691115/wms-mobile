<script lang="ts" setup>
import Icon from '@/components/Basic/Icon/src/Icon.vue'
import { ThemeEnum } from '@/enums/appEnum'
import {
  APP_PRESET_COLOR,
  WINDOWS_BACKGROUND_COLOR,
} from '@/settings/designSetting'
import { useAttrs } from '@/utils/hooks/core/useAttrs'
import { pickBy } from 'lodash-es'
import { computed, unref } from 'vue'
import { baseNavBarProps } from './props'

defineOptions({
  name: 'NavBarCustom',
})
const props = defineProps(baseNavBarProps)
const attrs = useAttrs()

const navBarProps = computed(() => {
  const statusOpt = {} as any

  if (props.theme === ThemeEnum.DARK) {
    statusOpt.color = '#fff'
    statusOpt.backgroundColor = APP_PRESET_COLOR
    statusOpt.leftColor = '#fff'
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000',
    })
  } else {
    statusOpt.color = '#171725'
    statusOpt.backgroundColor = '#fff'
    statusOpt.leftColor = '#171725'
    uni.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: WINDOWS_BACKGROUND_COLOR,
    })
  }

  return {
    ...statusOpt,
    ...(unref(attrs) || {}),
    ...pickBy(props, (e) => !!e),
  }
})

function handleClickBack() {
  if (props.back) {
    props.back()
  } else {
    uni.navigateBack({})
  }
}
</script>
<template>
  <uni-nav-bar v-if="!$slots.default" :border="false" :status-bar="true" height="40px" v-bind="navBarProps">
    <template v-if="props.isLeft" #left>
      <Icon :icon="ICON_UNICODE.ARROW_LEFT" :size="Px(50)" :color="navBarProps.leftColor"
        @tap.stop="() => handleClickBack()" />
    </template>
  </uni-nav-bar>

  <uni-nav-bar v-else :border="false" :status-bar="true" height="40px" v-bind="navBarProps">
    <template v-if="props.isLeft" #left>
      <Icon :icon="ICON_UNICODE.ARROW_LEFT" :size="Px(50)" :color="navBarProps.leftColor"
        @tap.stop="() => handleClickBack()" />
    </template>
    <template>
      <slot name="default" />
    </template>
  </uni-nav-bar>
</template>

<style lang="scss" scoped>
.navBar-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>
