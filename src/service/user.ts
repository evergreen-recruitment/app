import { http } from '@/utils/http'

export type UserInfoType = {
  id?: string
  avatar?: string
  userAccount?: string
  realName?: string
  phone?: string
  email?: string
  gender?: number
  age?: number
  location?: number
  applyStatus?: number
  hopeJob?: number
  createTime?: string
}

export type UpdateUserInfoFormType = {
  applyStatus?: number
  avatar?: string
  email?: string
  gender?: number
  hopeJob?: number
  id?: string
  location?: number
  phone?: string
  realName?: string
}

/**
 * 获取用户信息
 */
export function getUserInfoApi() {
  return http.get<UserInfoType>('user/info')
}
