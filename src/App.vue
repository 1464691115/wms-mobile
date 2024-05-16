<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { getAppEnvConfig } from './utils/env';
import { handleUpdateManager } from './utils/update'

onLaunch(async function () {
  console.log('App Launch')

  handleUpdateManager()

  wx.setInnerAudioOption({
    obeyMuteSwitch: false,
    success: function () {
      console.log('开启静音模式下播放音乐的功能')
    },

    fail: function () {
      console.log('静音设置失败')
    },
  })

  uni.loadFontFace({
    global: true,
    family: 'SH',
    source: `url("${VITE_GLOB_FONT_URL}")`,
  })
})

const { VITE_GLOB_FONT_URL } = getAppEnvConfig()

</script>

<style lang="scss">
@import '@/static/style/animation.scss';
@import '@/static/style/class.scss';
@import '@/static/style/style.scss';
@import '@/components/Basic/Icon/src/icon-font.scss';

view {
  box-sizing: border-box;
}

button {
  border-radius: 0;
}

image {
  will-change: transform;
}

page {
  width: 100vw;
  height: 100vh;

  background-color: #f8f8f8;
}

::v-deep .uni-easyinput__content {
  background-color: rgba(255, 255, 255, 0) !important;
}
</style>
