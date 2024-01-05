<template>
  <web-view :src="imgPrefix(getAgreement)" />
</template>

<script lang="ts" setup>
import { getAppEnvConfig } from '@/utils/env'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

onLoad((opt) => {
  switch (+opt?.type) {
    // 儿童协议
    case 1:
      getAgreement.value = `${VITE_GLOB_API_URL}/agreement/child-protection-protocol.html`
      uni.setNavigationBarTitle({
        title: '儿童保护政策',
      })
      break
    // 隐私协议
    case 2:
      getAgreement.value = `${VITE_GLOB_API_URL}/agreement/privacy-agreement.html`
      uni.setNavigationBarTitle({
        title: '用户协议、隐私政策',
      })
      break

    default:
      break
  }
})

const { VITE_GLOB_API_URL } = getAppEnvConfig()
let getAgreement = ref()
</script>

<style lang="scss" scoped></style>
