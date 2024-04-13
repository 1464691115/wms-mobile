import { isArray } from '@/utils/is'
import { BasicForm } from '../types'

export function filterComponentsProps(this, arr, propsParams = {}) {
  return arr?.map(function (el) {
    const fn = el.componentProps
    el.componentProps = typeof fn == 'function' ? fn(propsParams) : fn
    return el
  })
}

export function filterLabel(label?: string | Function, item?) {
  return typeof label == 'string' || label === undefined ? label : label(item)
}

/** 过滤 冒号 */
export function filterColon(str?: boolean | string) {
  return typeof str === 'string' ? str : str ? '：' : ''
}

export function schemaOrFn(
  fn,
  params: BasicForm.RenderCallbackParams,
  def = true,
) {
  if (fn === undefined) return def
  return typeof fn == 'function' ? fn(params) : fn
}
