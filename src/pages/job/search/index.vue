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
      v-model="keyword"
      placeholder="输入岗位关键词"
      placeholder-left
      focus
      hide-cancel
      @search="getSearchResult"
    ></wd-search>
  </view>
</template>

<script lang="ts" setup>
import { JobFilterType, JobSearchFormType, jobSearchApi } from '@/service/job'

const keyword = ref('')
const searchState = ref<JobSearchFormType>({
  keyword: '',
  city: 101020100,
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
  console.log(res)
}
</script>

<style lang="scss" scoped>
//
</style>
