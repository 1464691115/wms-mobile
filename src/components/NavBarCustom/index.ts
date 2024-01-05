export function getStatusBarHeigh() {
  return uni.getSystemInfoSync()?.statusBarHeight || 44
}
