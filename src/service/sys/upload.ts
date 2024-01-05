import { defHttp } from '@/api'

export enum UploadApi {
  UPLOAD_IMG = '/images',
}

export function uploadImgApi(params) {
  return defHttp.uploadFile<{ pic: string }>({
    url: UploadApi.UPLOAD_IMG,
    baseUrl: '/apiPublic',
    filePath: params,
  })
}
