import { UserInfo } from '#/store'

export interface LoginParams {
  phone?: string
  code?: string
  nickName?: string
  avatarUrl?: string
}

export interface GetUserInfoModel extends UserInfo {}

export interface LoginResultModel extends UserInfo {}
