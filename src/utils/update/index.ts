/** 检查版本并更新重启 */
export function handleUpdateManager() {
  // #ifdef MP
  const updateManager = uni.getUpdateManager()
  updateManager.onUpdateReady(function () {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })
  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
  })

  updateManager.onCheckForUpdate(function () {
    // 请求完新版本信息的回调
  })
  // #endif
}
