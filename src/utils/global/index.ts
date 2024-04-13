import { isUrl } from '@/utils/is'
import { getAppEnvConfig } from '@/utils/env'

/** 图片添加域名 */
export function imgPrefix(url) {
  if (!url) return ''
  if (
    isUrl(url) ||
    ['wxfile://', 'data:image/png;base64,', '/static/images/'].some((el) =>
      url.includes(el),
    )
  )
    return url

  const { VITE_GLOB_IMG_PREFIX } = getAppEnvConfig()
  return VITE_GLOB_IMG_PREFIX + url
}

// @ts-ignore
export const _defineSlots = (() => {}) as typeof defineSlots

export function formatRichText(html) {
  let newContent

  if (typeof html == 'string') {
    newContent = html.replace(
      /\<img/gi,
      '<img style="max-width:100%;height:auto;display:block;"',
    )
  } else {
    newContent = html
  }

  return newContent
}

export { Px } from '../lib/s-view'
