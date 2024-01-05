import { isArray } from '../is'

let timeout: NodeJS.Timeout | null

interface debounceOptions {
  /** 是否指定在延迟开始前调用 */
  trailing: boolean
  /** 是否指定在延迟结束后调用 */
  leading: boolean
}

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Object} options 
 * #### options.trailing 是否指定在延迟开始前调用。
 * #### options.leading 是否指定在延迟结束后调用
  ---
 * ### 实例 传参
 * @change="debounce.call([$event, item.id], xxx, 500, { trailing: false, leading: true })"<br>
 * ***注意：如果参数为数组 比如 arr 是个数组，要把它传递到方法上需要 [arr] 包起来***
 *  
 * @return {any}
 */
function debounce(
  this,
  func,
  wait = 500,
  options = {} as Partial<debounceOptions>,
) {
  const { trailing = false, leading = true } = options

  const that = isArray(this) ? this : [this]

  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (leading) {
    const callNow = !timeout
    timeout = setTimeout(() => {
      timeout = null
      trailing && typeof func === 'function' && func(...that)
    }, wait)
    if (callNow) typeof func === 'function' && func(...that)
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      trailing && typeof func === 'function' && func(...that)
    }, wait)
  }
}

export default debounce
