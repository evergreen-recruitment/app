import { http } from '@/utils/http'
import { SimpleEmployeeType } from './employee'
import { SimpleCompanyType } from './company'

export type JobItemType = {
  id: string
  companyId: string
  companyName: string
  title: string
  description: string
  salary: string
  education: string
  experience: string
  jobSkills: string[]
  jobLabels: string[]
  address: string
  cityName: string
  areaDistrict: string
  businessDistrict: string
  city: number
  welfareList: string[]
  updateTime: string
  jobType: number
  jobStandardName: string
  longitude: number
  latitude: number
  employeeVO: SimpleEmployeeType
  companyVO: SimpleCompanyType
}
/**
 * 获取最新岗位
 * @param pageParam
 */
export function getNewJobsApi(pageParam: PageRequestType) {
  return http.post<JobItemType[]>('/job/newJobs', pageParam)
}
/**
 * 获取推荐岗位
 * @param pageParam
 */
export function getRecommendJobsApi(pageParam: PageRequestType) {
  return http.post<JobItemType[]>('/job/Recommend', pageParam)
}
/**
 * 获取附件岗位
 * @param pageParam
 */
export function getNearbyJobsApi(pageParam: PageRequestType & { city: number }) {
  return http.post<JobItemType[]>('/job/nearByJob', pageParam)
}
