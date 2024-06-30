<route lang="json5" type="jobSearch">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '岗位搜索',
  },
}
</route>

<template>
  <view>
    <wd-search
      custom-class="sticky top-0 z-10"
      v-model="searchState.keyword"
      placeholder="输入岗位关键词"
      placeholder-left
      focus
      hide-cancel
      @search="getSearchResult"
    ></wd-search>
    <view class="mt-4">
      <job-card v-for="job in jobList" :job="job" :key="job.id"></job-card>
    </view>
  </view>
</template>

<script lang="ts" setup>
import JobCard from './components/job-card/job-card'
import { JobFilterType, JobItemType, JobSearchFormType, jobSearchApi } from '@/service/job'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const jobList = ref<JobItemType[]>([])
const searchState = ref<JobSearchFormType>({
  keyword: '',
  city: 0,
  current: 1,
  pageSize: 10,
  sortField: '',
  sortOrder: '',
})
const jobFilterData = ref<JobFilterType>({
  jobStandardId: null,
  jobType: 0,
  experience: 0,
  salary: 0,
})
async function getSearchResult() {
  const res = (await jobSearchApi({ ...searchState.value, ...jobFilterData.value })).data
  if (res.records.length) {
    jobList.value = res.records as any
  } else {
    jobList.value = []
    uni.showToast({
      icon: 'none',
      title: '暂无数据',
    })
  }
}
</script>

<style lang="scss" scoped>
//
</style>
