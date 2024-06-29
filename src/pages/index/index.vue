<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view>
    <!-- <wd-navbar
      title="常青招聘"
      custom-style="background-color: transparent !important;"
      :bordered="false"
    >
      <template #left>
        <image class="w-10 h-10" src="/static/images/logo.png" mode="scaleToFill" />
      </template>
    </wd-navbar> -->
    <wd-swiper
      :list="hotCompanyImageList"
      custom-class="w-full rounded-0"
      image-mode="aspectFit"
      autoplay
    >
      <template #indicator="{ current, total }">
        <view
          class="absolute bottom-4 right-4 text-white text-xs p-1 bg-[rgba(0,0,0,0.7)] rounded-3"
        >
          {{ current + 1 }}/{{ total }}
        </view>
      </template>
    </wd-swiper>
    <wd-tabs v-model="currentTab" :offset-top="safeAreaInsets?.top" sticky>
      <wd-tab v-for="item in tabs" :title="item.label" :name="item.id" :key="item.id">
        <job-card v-for="job in item.list" :job="job" :key="job.id"></job-card>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import JobCard from './components/jobCard.vue'
import { SimpleCompanyType, getHotCompanyApi } from '@/service/company'
import { getNewJobsApi, getNearbyJobsApi } from '@/service/job'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const currentTab = ref('热门岗位')
const tabs = ref([
  {
    id: 0,
    label: '热门岗位',
    list: [],
  },
  {
    id: 1,
    label: '最新岗位',
    list: [],
  },
  {
    id: 2,
    label: '附近岗位',
    list: [],
  },
])
const hotCompanyList = ref<SimpleCompanyType[]>([])
const hotCompanyImageList = ref<string[]>([])

async function getHotCompany() {
  hotCompanyList.value = (await getHotCompanyApi()).data
  // 将公司logo添加到hotCompanyImageList中
  hotCompanyList.value.forEach((item) => {
    hotCompanyImageList.value.push(item.logo)
  })
}

async function getJobData() {
  tabs.value[0].list = await (await getNewJobsApi({ current: 2, pageSize: 12 })).data
  tabs.value[1].list = await (await getNewJobsApi({ pageSize: 12 })).data
  tabs.value[2].list = await (
    await getNearbyJobsApi({
      current: 1,
      pageSize: 12,
      city: 101020100,
    })
  ).data
}

onReady(async () => {
  await getHotCompany()
  await getJobData()
})
</script>
