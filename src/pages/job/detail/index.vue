<route lang="json5" type="jobDetail">
{
  layout: 'default',
  style: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '岗位详情',
  },
}
</route>

<template>
  <view v-if="jobDetail" class="job-detail px-1">
    <view class="job-title detail-item">
      <view class="flex justify-between items-center mb-1">
        <view class="max-w-2/3 truncate text-2xl font-bold">{{ jobDetail.title }}</view>
        <view class="max-w-1/3 truncate text-base text-blue">{{ jobDetail.salary }}</view>
      </view>
      <view class="flex space-x-1 text-gray">
        <view>
          <wd-icon name="location"></wd-icon>
          {{ jobDetail.cityName }}
        </view>
        <view v-for="label in jobDetail.jobLabels" :key="label">
          <wd-icon name="tips"></wd-icon>
          {{ label }}
        </view>
      </view>
    </view>
    <view class="job-company detail-item flex justify-between items-center">
      <view class="flex">
        <image class="rounded-2 mr-2 w-12 h-12" :src="jobDetail.companyVO.logo" mode="aspectFit" />
        <view class="flex flex-col justify-between">
          <view>
            <view class="text-base text-black font-bold">{{ jobDetail.companyVO.name }}</view>
            <view class="text-sm text-gray">
              {{ jobDetail.companyVO.stageId }} · {{ jobDetail.companyVO.scaleId }} ·
              {{ jobDetail.companyVO.industryId }}
            </view>
          </view>
        </view>
      </view>
      <wd-icon class="text-gray" name="chevron-right" size="34px"></wd-icon>
    </view>
    <view class="job-detail detail-item">
      <view class="text-xl font-bold">岗位详情</view>
      <wd-tag custom-class="mr-1" type="primary" v-for="label in jobDetail.jobSkills" :key="label">
        {{ label }}
      </wd-tag>
      <view class="p-1 text-sm text-gray whitespace-pre-line">{{ jobDetail.description }}</view>
    </view>
    <view class="job-employee detail-item flex justify-between items-center">
      <view class="flex">
        <image
          class="rounded-full mr-2 w-12 h-12"
          :src="jobDetail.employeeVO.avatar"
          mode="aspectFit"
        />
        <view class="flex flex-col justify-between">
          <view>
            <view class="text-base text-black font-bold">{{ jobDetail.employeeVO.realName }}</view>
            <view class="text-sm text-gray">{{ jobDetail.employeeVO.position }}</view>
          </view>
        </view>
      </view>
      <wd-icon class="text-gray" name="chevron-right" size="34px"></wd-icon>
    </view>
    <view class="job-location w-full">
      <map
        class="w-full"
        :longitude="jobDetail.longitude"
        :latitude="jobDetail.latitude"
        :markers="markers"
        enable-3D
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { type JobItemType, getJobDetailApi } from '@/service/job'
const jobDetail = ref<JobItemType>()
const markers = computed(() => {
  return [
    // 设置标记点
    {
      latitude: jobDetail.value.latitude,
      longitude: jobDetail.value.longitude,
      title: '工作地点',
      // icon: 'https://a.amap.com/jsapi/static/image/plugin/marker_red.png',
      // width: 10,
      // height: 10,
    },
  ]
})
// 获取数据
async function getJobDetailData(id: string) {
  jobDetail.value = (await getJobDetailApi(id)).data
}
onLoad(async (options) => {
  await getJobDetailData(options.id)
})
</script>

<style lang="scss" scoped>
.detail-item {
  @apply p-4 my-2 bg-white rounded-2;
}
</style>
