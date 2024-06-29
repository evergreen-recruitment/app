import { http } from '@/utils/http'

export type SimpleCompanyType = {
  id: string
  name: string
  logo: string
  address: string
  description: string
  scaleId: number
  stageId: number
  industryId: number
  jobNum: number
  employeeNum: number
}
/**
 * 获取热门公司
 */
export function getHotCompanyApi() {
  return http.get<SimpleCompanyType[]>('/company/hotCompanies')
}
