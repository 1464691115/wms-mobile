import { UserInfo } from '#/store'

export interface LoginParams {
  userName?: string
  password?: string
  nickName?: string
  avatarUrl?: string
}

export interface GetUserInfoModel extends UserInfo {}

export interface LoginResultModel extends UserInfo {}
