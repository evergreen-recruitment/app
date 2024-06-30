import { http } from '@/utils/http'
import { SimpleEmployeeType } from './employee'
import { SimpleCompanyType } from './company'
export type JobFilterType = {
  jobStandardId?: number | null // 职位类型
  jobType?: number | null // 求职类型
  experience?: number | null // 经验
  salary?: number | null // 薪资
}

export type JobSearchFormType = {
  keyword?: string
  city?: number
} & JobFilterType &
  PageRequestType

export type SimpleJobItemType = {
  id: string
  companyName: string
  title: string
  salary: string
  education: string
  experience: string
  jobLabels: string[]
  jobSkills: string[]
  cityName: string
  areaDistrict: string
  welfareList: string[]
  updateTime: string
  jobType: number
}

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
 * 获取附近岗位
 * @param pageParam
 */
export function getNearbyJobsApi(pageParam: PageRequestType & { city: number }) {
  return http.post<JobItemType[]>('/job/nearByJob', pageParam)
}
/**
 * 获取岗位详情
 * @param jobId
 * @returns
 */
export function getJobDetailApi(jobId: string) {
  return http.get<JobItemType>('/job/jobDetail', { jobId })
}
/**
 * 岗位搜索
 * @param searchForm
 * @returns
 */
export function jobSearchApi(searchForm: JobSearchFormType) {
  return http.post<PageType<SimpleJobItemType>>('/job/search', searchForm)
}
