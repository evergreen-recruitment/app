import { http } from '@/utils/http'

/**
 * 发送短信验证码
 * @param phone
 */
export function sendSMSApi(phone: string) {
  return http.get<boolean>('/common/phone/send', { phone })
}
