const cdn = 'https://ocrapi.allyesok.com'

/** 图片添加域名 */
export function CDN(url) {
    if (!url) return ''
    if (['http', 'https', 'wxfile://', 'data:image/png;base64,'].some(el => url.includes(el))) return url
    return cdn + url
}

/** 图片预览 */
export function previewImg(url: string | string[], current = 0) {
    const urls: string[] = []
    if (!url) return
    if (typeof url === 'string') urls.push(url)
    else urls.push(...url)
    uni.previewImage({
        urls,
        current
    })
}


//  日期格式
export function moment(str?: string | Date) {
    const that = str ? new Date(str) : new Date()
    var o = {
        'M+': that.getMonth() + 1, //月份
        'd+': that.getDate(), //日
        'h+': that.getHours(), //小时
        'm+': that.getMinutes(), //分
        's+': that.getSeconds(), //秒
        'q+': Math.floor((that.getMonth() + 3) / 3), //季度
        'S+': that.getMilliseconds(), //毫秒
    };

    return {
        format(fmt) {
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (that.getFullYear() + '').substr(4 - RegExp.$1.length)
                );
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                    );
                }
            }

            return fmt
        }
    };
};


/** 查找 对象数组 */
export function selectObj<T extends any[]>(list: T, key: keyof T[0] = 'id', val: any, isIndex = false) {
    if (!list) return []
    return list[isIndex ? 'findIndex' : 'find'](el => el[key] && (el[key] == val))
}


/**
 * 分数过滤
 * @param {{ type: '优秀', score: 0 }} obj 
 */
export function ecogFilter(obj) {
    if (!obj) return '请选择分数'
    return `${obj.score}(${obj.type})`
}

/**
 * 获取用户信息 异步
 * @returns {Promise<UniApp.GetUserProfileRes>} 
 */
export async function getUserInfo() {
    return new Promise((res, rej) => {
        uni.getUserProfile({
            desc: '用于展示在个人中心',
            success(result) {
                res(result)
            },
            fail() {
                rej()
            }
        })
    })
}

import debounce from '../lib/debounce'
import throttle from '../lib/throttle'

export * from './toPage'
export { debounce, throttle }