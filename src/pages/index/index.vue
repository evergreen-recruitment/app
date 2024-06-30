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
      </template>
    </wd-navbar> -->
    <!-- custom-class="w-full rounded-0" -->
    <view class="flex justify-between items-center px-2 box-border">
      <image class="w-1/3 h-16" src="/static/images/logo1-black.png" mode="aspectFit" />
      <view class="center text-base font-bold">
        大学生招聘平台
        <view class="text-sm font-500">(测试)</view>
      </view>
    </view>
    <view class="card-swiper">
      <wd-swiper
        custom-class="mx-auto"
        custom-image-class="custom-image"
        custom-next-image-class="custom-image-prev"
        custom-prev-image-class="custom-image-prev"
        :list="hotCompanyImageList"
        image-mode="aspectFit"
        previousMargin="24px"
        nextMargin="24px"
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
    </view>
    <wd-tabs
      custom-style="background-color: transparent !important;"
      v-model="currentTab"
      :offset-top="safeAreaInsets?.top"
      sticky
      swipeable
      animated
    >
      <wd-tab v-for="item in tabs" :title="item.label" :name="item.id" :key="item.id">
        <job-card v-for="job in item.list" :job="job" :key="job.id"></job-card>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import JobCard from './components/job-card/job-card'
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
  tabs.value[0].list = (await getNewJobsApi({ current: 2, pageSize: 12 })).data
  tabs.value[1].list = (await getNewJobsApi({ pageSize: 12 })).data
  tabs.value[2].list = (
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
<style lang="scss" scoped>
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #e7e7e7;
  --wot-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 24rpx;
  box-sizing: border-box;
  :deep(.custom-image) {
    height: 158px !important;
    border-radius: 12rpx;
    background: #ffffff;
    box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
  }
  :deep(.custom-image-prev) {
    height: 128px !important;
  }
}
:deep(.wd-tabs__nav) {
  background: rgba(255, 255, 255, 0.6);
  @apply backdrop-blur-md backdrop-saturate-150;
}
</style>
