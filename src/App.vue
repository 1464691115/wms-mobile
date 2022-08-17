<script setup lang="ts">
import { onLaunch } from "@dcloudio/uni-app";

onLaunch(async function () {

  console.log("App Launch");
  // #ifdef MP
  const updateManager = uni.getUpdateManager();
  updateManager.onUpdateReady(function (res) {
    uni.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  updateManager.onUpdateFailed(function (res) {
    // 新的版本下载失败
  });

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
  });
  // #endif
});
</script>

<style lang="scss">
@import "~@/static/style/animation.scss";
@import "~@/static/style/class.scss";
@import "~@/static/style/style.scss";

@font-face {
  font-family: "iconfont"; /* Project id 3398330 */
  src: url("./static/font/iconfont.woff2") format("woff2"),
    url("./static/font/iconfont.woff") format("woff"),
    url("./static/font/iconfont.ttf") format("truetype");
}

.font-icon {
  font-family: "iconfont";
}

view {
  box-sizing: border-box;
}

button {
  border-radius: 0;
}

page {
  width: 100vw;
  height: 100vh;
}
</style>
