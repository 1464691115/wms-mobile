import { PromiseSystem } from "@/api/instanceof";

export function useLoading(title = '加载中') {
  uni.showLoading({
    title,
    mask: true,
  });
  return function () {
    uni.hideLoading()
  }
}

/**
* @description: 弹出对话框
* @param {String} title 标题
* @param {String} content 内容
* @return {(confirmText:string,cancelText:string)=>Promise} 点击的确认res.confirm为true，取消反之
* @author: liukesen
*/
export function showModal(title = '', content = '') {
  /**
 * @param {String} trueText 确认文本，如果trueText为好的话清空falseText
 * @param {String} falseText 取消文本
 * @return {Promise<boolean>} 点击的确认res.confirm为true，取消反之
 */
  return (confirmText = '确认', cancelText: string | null = '取消') => new Promise((resolve, reject) => {
    uni.showModal({
      title: title || '提示',
      content,
      cancelText: cancelText || '',
      confirmText,
      showCancel: cancelText !== null,
      success(res) {
        resolve(res.confirm);
      },
      fail(err) {
        reject(err)
      }
    });
  });
}

/** 选择图片 */
export function chooseImage(options: { count: number, sourceType?: Array<'album' | 'camera'> } = {} as any) {
  return new Promise<UniApp.ChooseImageSuccessCallbackResult>((resolve, reject) => {
    uni.chooseImage({
      count: options.count || 1,
      sourceType: options.sourceType || ['album', 'camera'],
      success(e) {
        if (!e || !e.tempFilePaths) return reject()
        resolve(e);
      },
      fail: (err) => {
        reject();
      },
    });
  });
}


/**
 * @description: 金额补零
 * @param {Number} 金额
 * @return {Number} 补完零的金额
 * @author: liukesen
 */
export function turnString(num) {
  var re = /^[0-9]+$/;
  var re2 = /^[0-9]+(\.[0-9]{1})$/;
  const numType = typeof num;
  let arr;
  if (numType == 'string' || numType == 'number') {
    arr = '';
    return testNum(num);
  }
  arr = [];
  for (let i = 0; i < num.length; i++) {
    const element = num[i];
    arr.push(element < 1 ? element : parseFloat(element).toFixed(2));
  }

  function testNum(num) {
    if (re.test(num)) {
      num += '.00';
    }
    if (re2.test(num)) {
      num += '0';
    }
    return num;
  }
  return arr;
}

/** 扁平化数组 */
export function flattenArray(arr: any[], key = '') {
  return arr.reduce((pre, cur) => {
    if (Array.isArray(key ? cur[key] : cur)) {
      pre.push(...flattenArray(key ? cur[key] : cur));
    } else {
      pre.push(key ? cur[key] : cur);
    }
    return pre
  }, []);
}

/** get请求 参数转换 */
export function queryParamsStr(_data = {}) {
  return '?' + Object.keys(_data).reduce<string[]>((pre, cur) => pre.concat([`${cur}=${_data[cur]}`]), []).join('&')
}


/** 图片转 base64 */
export function getBase64(url) {
  return new Promise<string>((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath: url,
      encoding: 'base64',
      success: e => {
        let base64 = 'data:image/jpeg;base64,' + e.data;
        resolve(base64)
      },
      fail() {
        reject()
      }
    });
  })
}

/** base64 转 临时路径 */
export function base64ToTempl(base64: string) {
  return new Promise<string>((resolve, reject) => {
    //随机定义路径名称
    const times = new Date().getTime();
    const codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
    const data = base64.replace(/data\:image\/png\;base64\,/g, function () { return '' })

    uni.getFileSystemManager().writeFile({
      filePath: codeimg,
      data,
      encoding: 'base64',
      success: e => {
        resolve(codeimg)
      },
      fail() {
        reject()
      }
    });
  })
}


/** 隐藏 姓名 */
export function nickNameHide(_nickName = '') {
  if (!_nickName) return "";
  else if (_nickName.length < 3) return _nickName[0] + "*";
  else return _nickName.replace(/(.).*(.)/g, "$1*$2");
}


/** 获取页面间传值的 需要转作用域 */
export async function getChannelOn(this: any, name) {
  return new Promise((resolve) => {
    const that = this;
    if (!that.getOpenerEventChannel) return new PromiseSystem('on is undefined')
    if (!name) return new PromiseSystem('传需要接受的on(函数名)')
    const eventChannel = that.getOpenerEventChannel();
    if (!eventChannel.on) return new PromiseSystem(`can't have no on in a eventChannel`)
    eventChannel.on(name, function (arg) {
      return resolve(arg)
    })
    return
  })
}

/** 执行页面间的event 需要转作用域 */
export async function getChannelEmit(this: any, name, data) {
  const that = this;
  if (!that.getOpenerEventChannel) return new PromiseSystem('emit is undefined')
  if (!name) return new PromiseSystem('传需要接受的emit(函数名)')
  const eventChannel = that.getOpenerEventChannel();
  if (!eventChannel.emit) return new PromiseSystem(`can't have emit on in a eventChannel`)
  eventChannel.emit(name, data)
  return
}


/** 查找 对象数组 */
export function selectObj<L extends Array<any>, K extends keyof L[number]>(list: L, key: K, val: L[number][K], isIndex = false) {
  if (!list) return undefined

  for (let i = 0; i < list.length; i++) {
    if (list[i][key] == val) return isIndex ? i : list[i];
  }
  return undefined
}


export function getMiddle(str: string | any[] | number) {
  const len = typeof str == 'number' ? str : str.length
  const index = len % 2 !== 0 && Math.ceil(len / 2 - 1)
  if (!index) return false
  return index
}