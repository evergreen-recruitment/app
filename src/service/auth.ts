import { http } from '@/utils/http'

export type LoginByCaptchaFormType = {
  phone: string
  verifyCode?: string
  privacy?: boolean
  uuid?: string
}

export type UserVOType = {
  token: string
  userVO: {
    id: string
    phone: string
    userAccount: string
    avatar: string
    location: number
    applyStatus: number
    createTime: string
    realName: string
    age: number
    gender: number
    email: string
    hopeJob: number
  }
}

/**
 * 通过验证码登录
 * @param loginForm 登录表单
 */
export function loginByCaptchaApi(loginForm: LoginByCaptchaFormType) {
  return http.post<UserVOType>('/user/login/phone', loginForm)
}

/**
 * 退出登录
 */
export function logoutApi() {
  return http.get('/user/logout')
}
