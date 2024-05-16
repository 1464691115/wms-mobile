import { PromiseSystem } from '@/api/instanceof'
import { isObject } from './is'
import { getCurrentInstance, unref } from 'vue'

/**
 * @description: 弹出对话框
 * @param {String} title 标题
 * @param {String} content 内容
 */
export function showModal(title = '', content = '') {
  /**
   * @param {String} trueText 确认文本，如果trueText为好的话清空falseText
   * @param {String} falseText 取消文本
   * @return {Promise<boolean>} 点击的确认res.confirm为true，取消反之
   */
  return (confirmText = '确认', cancelText: string | null = '取消') =>
    new Promise<Boolean>((resolve, reject) => {
      uni.showModal({
        title: title || '提示',
        content,
        cancelText: cancelText || '',
        confirmText,
        showCancel: cancelText !== null,
        success(res) {
          resolve(res.confirm)
        },
        fail(err) {
          reject(err)
        },
      })
    })
}

/** 选择图片 */
export function chooseImage(
  options: {
    count: number
    sourceType?: Array<'album' | 'camera'>
  } = {} as any,
) {
  return new Promise<UniApp.ChooseImageSuccessCallbackResult>(
    (resolve, reject) => {
      uni.chooseImage({
        count: options.count || 1,
        sourceType: options.sourceType || ['album', 'camera'],
        success(e) {
          if (!e || !e.tempFilePaths) return reject()
          resolve(e)
        },
        fail: () => {
          reject()
        },
      })
    },
  )
}

/** get请求 参数转换 */
export function queryParamsStr(_data = {}) {
  return (
    '?' +
    Object.keys(_data)
      .reduce<string[]>((pre, cur) => pre.concat([`${cur}=${_data[cur]}`]), [])
      .join('&')
  )
}

/** 图片转 base64 */
export function getBase64(url) {
  return new Promise<string>((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath: url,
      encoding: 'base64',
      success: (e) => {
        let base64 = 'data:image/jpeg;base64,' + e.data
        resolve(base64)
      },
      fail() {
        reject()
      },
    })
  })
}

/** base64 转 临时路径 */
export function base64ToTempl(base64: string) {
  return new Promise<string>((resolve, reject) => {
    //随机定义路径名称
    const times = new Date().getTime()
    const codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png'
    const data = base64.replace(/data\:image\/png\;base64\,/g, function () {
      return ''
    })

    uni.getFileSystemManager().writeFile({
      filePath: codeimg,
      data,
      encoding: 'base64',
      success: () => {
        resolve(codeimg)
      },
      fail() {
        reject()
      },
    })
  })
}

/** 隐藏 姓名 */
export function nickNameHide(_nickName = '') {
  if (!_nickName) return ''
  else if (_nickName.length < 3) return _nickName[0] + '*'
  else return _nickName.replace(/(.).*(.)/g, '$1*$2')
}

/** 获取页面间传值的 */
export async function getChannelOn(name) {
  return new Promise<any>((resolve) => {
    if (!name) return new PromiseSystem('传需要接受的on(函数名)')
    //@ts-ignore
    const eventChannel = getCurrentInstance()?.proxy?.getOpenerEventChannel?.()
    if (!eventChannel) return new PromiseSystem('on is undefined')
    if (!eventChannel.on)
      return new PromiseSystem(`can't have no on in a eventChannel`)
    eventChannel.once(name, function (arg) {
      return resolve(arg)
    })
    return
  })
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}

export function getDynamicProps<T extends Record<any, any>, U>(
  props: T,
): Partial<U> {
  const ret = {}

  Object.keys(props).map((key) => {
    ret[key] = unref(props[key])
  })

  return ret as Partial<U>
}

export function initAudio(useWebAudioImplement = false) {
  //@ts-ignore
  let innerAudioContext = uni.createInnerAudioContext({ useWebAudioImplement })
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })

  return {
    innerAudioContext,
    reload: function (url, word?) {
      return new Promise((res) => {
        innerAudioContext.src =
          url || 'https://dict.youdao.com/dictvoice?type=0&audio=' + word

        innerAudioContext.onCanplay(res)
      })
    },
    pause: function () {
      innerAudioContext.pause()
    },
    play: function () {
      console.log('开始播放')

      innerAudioContext.stop()
      innerAudioContext.play()

      return new Promise((res) => {
        innerAudioContext.onEnded(res)
      })
    },
    destroy: function () {
      innerAudioContext.destroy()
    },
  }
}

export function mobileEllipsis(phone: string) {
  return phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') || phone
}

export function stringToRgb(str, mode = 'string') {
  const template = str.toLowerCase()
  let result = ''
  if (template.indexOf('rgb(') === 0) {
    result = template
  } else if (template.indexOf('rgba(') === 0) {
    const colors = template
      .replace(/rgba\(/g, '')
      .replace(/\)/g, '')
      .split(',')
    const r = colors[0]
    const g = colors[1]
    const b = colors[2]
    result = `rgb(${r},${g},${b})`
  } else if (template.indexOf('#') === 0) {
    let colors = template.replace(/#/g, '')
    let resultArr = [] as number[]
    if (colors.length === 3) {
      colors = colors.replace(/[0-9a-f]/g, (str) => {
        return str + str
      })
    }
    for (let i = 0; i < colors.length; i += 2) {
      resultArr.push(parseInt(colors[i] + colors[i + 1], 16))
    }
    result = `rgb(${resultArr.join(',')})`
  }
  if (mode === 'string') {
    return result
  } else if (mode === 'array') {
    return result.replace(/rgb\(/g, '').replace(/\)/g, '').split(',')
  }
}


export function ObjectForInMap<T extends object, KT extends keyof T, I extends (val: valueOfU<T>, key: KT) => any>(obj: T, inter: I) {
  return Object.keys(obj).map<ReturnType<I>>(el => inter?.(obj[el], el as any))
}
