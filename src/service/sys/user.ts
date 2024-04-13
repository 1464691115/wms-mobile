import { UserApi } from './ApiEnum'
import type { LoginParams, LoginResultModel } from './model/userModel'
import { defHttp } from '@/api'

export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>({
    url: UserApi.LOGIN,
    data: params,
  })
}
