import { EMIT_ON_KEY } from "@/enums";
import { routesUrl } from "@/routes";
import { queryParamsStr } from "../index";



/** 前往裁剪图片 */
export function toCropperImg(url: string, isAvatar: any = '', cropFixed: any = '') {
    return new Promise<string>((res) => {
        uni.$once(EMIT_ON_KEY.SET_FILE_PATH, res)
        uni.navigateTo({
            url: routesUrl.cropperImg + queryParamsStr({ url, isAvatar, cropFixed }),
        })
    })
}


/** 前往拍照 */
export function toCamera() {
    uni.navigateTo({ url: routesUrl.camera })
}
