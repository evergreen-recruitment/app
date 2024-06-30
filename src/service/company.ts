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

export const CompanyScaleEnum = {
  '-1': '类型不限',
  0: '0-20人',
  1: '20-99人',
  2: '100-499人',
  3: '500-999人',
  4: '1000-9999人',
  5: '10000人以上',
}

export const CompanyStageEnum = {
  '-1': '类型不限',
  0: '未融资',
  1: '天使轮',
  2: 'A轮',
  3: 'B轮',
  4: 'C轮',
  5: 'D轮及以上',
  6: '上市公司',
  7: '不需要融资',
}

/**
 * 获取热门公司
 */
export function getHotCompanyApi() {
  return http.get<SimpleCompanyType[]>('/company/hotCompanies')
}
