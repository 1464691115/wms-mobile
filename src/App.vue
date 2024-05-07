<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { handleUpdateManager } from './utils/update'

onLaunch(async function () {
  console.log('App Launch')

  handleUpdateManager()

})


</script>

<style lang="scss">
@import '@/static/style/animation.scss';
@import '@/static/style/class.scss';
@import '@/static/style/style.scss';
@import '@/components/Basic/Icon/src/icon-font.scss';

.font-icon {
  font-family: 'iconfont';
}

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
  height: 100%;

  background-color: #f8f8f8;
}

::v-deep .uni-easyinput__content {
  background-color: rgba(255, 255, 255, 0) !important;
}
</style>
