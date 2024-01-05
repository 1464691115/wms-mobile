/** number 转化成 css 的单位字符串 */
export function Px(
  num: number | string = 0,
  isStr: 'rpx' | 'px' | 'vw' | 'upx' = 'rpx',
) {
  return !isNaN(+num) || typeof num == 'number' ? num + isStr : num
}

/** 是否为圆角 */
export function isCircle(bol: string | boolean) {
  return bol === 'circle' || bol === true ? '51%' : '0'
}

/** 提示框 */
export function showToast(
  content,
  icon: UniApp.ShowToastOptions['icon'] = 'none',
  ait = 1000,
) {
  return new Promise((resolve, reject) => {
    uni.showToast({
      icon,
      title: content,
      duration: ait - 50,
      mask: true,
      fail: reject,
    })
    setTimeout(() => {
      resolve(true)
    }, ait)
  })
}

/** 判断两个对象是否相等 */
export function deepEq(a, b, aStack, bStack) {
  aStack = aStack || []
  bStack = bStack || []

  var length = aStack.length

  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b
    }
  }

  aStack.push(a)
  bStack.push(b)

  var keys = Object.keys(a)
  length = keys.length
  var key

  while (length--) {
    key = keys[length]

    console.log(a[key], b[key], aStack, bStack)

    if (!eq(a[key], b[key], aStack, bStack)) return false
  }

  // aStack.pop();
  // bStack.pop();
  return true
}

export function eq(a, b, aStack, bStack) {
  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b

  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false

  // 判断 NaN
  if (a !== a) return b !== b

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  var type = typeof a
  if (type !== 'function' && type !== 'object' && typeof b != 'object')
    return false

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack)
}

/** 深拷贝 */
export function deepClone<T>(value: T, hash?: WeakMap<object, any>): T
export function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj
  if (obj instanceof Date) return new Date(obj)

  if (obj instanceof RegExp) return new RegExp(obj)

  if (typeof obj !== 'object') return obj

  if (hash.get(obj)) return hash.get(obj)

  let cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

/** (基本类型value对象 & 基本类型数组)转数组对象 */
export function arrToObjectArr<
  A extends Record<number, any>,
  I extends string = 'id',
  V extends string = 'value',
>(
  arr: A,
  indexKey: I,
  valueKey: V,
): (Record<I, string | number> & Record<V, A[0]>)[]
export function arrToObjectArr(arr, indexKey = 'id', valueKey = 'value') {
  return Object.keys(arr || {}).map((key) => ({
    [indexKey]: key,
    [valueKey]: arr[key],
  })) as any
}

/** 拷贝 发送对象 的属性到 接收对象 */
export function funcForIn(send, receiver) {
  if (!send) throw 'send is undefined'
  for (const key in send) {
    if (Object.prototype.hasOwnProperty.call(send, key)) {
      const element = send[key]
      receiver[key] = element
    }
  }
}

/** 生成数组 */
export function createArray<V>(len = 0, val: V) {
  return Array.from({ length: len }, () => val)
}
