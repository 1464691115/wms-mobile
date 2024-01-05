export class ApiErrorMsg {
  msg
  returnCode
  /** @type {(...arg: returnPromise<globalRequestResult>)} */
  constructor(msg = 'zZZ', returnCode = '接口异常提示') {
    this.msg = msg
    this.returnCode = returnCode
  }
}

/** 系统错误 */
export class PromiseSystem {
  msg = ''
  type = ''
  constructor(msg = 'zZZ', type = '系统提示') {
    this.msg = msg
    this.type = type
    throw `${this.type}：${this.msg}`
  }
}

/** 页面加载提示 */
export class PageLoadMsg {
  msg = ''
  type = ''
  constructor(msg = 'zZZ', type = '页面提示') {
    this.msg = msg
    this.type = type
    throw `${this.type}：${this.msg}`
  }
}

/** 表单提示 */
export class FormMsg {
  msg = ''
  type = ''
  constructor(msg = 'zZZ', type = '表单提示') {
    this.msg = msg
    this.type = type
  }
}

/**
 * 判断多个实例
 * @param {any} obj
 * @param {any | any[]} msg
 * @returns
 */
export function isInstanceof(obj, msg: ApiErrorMsg & any[]) {
  const msgs: any[] = []
  if (!msg.length) msgs.push(msg)
  else msgs.push(...msg)

  return msgs.some((el) => obj instanceof el)
}
