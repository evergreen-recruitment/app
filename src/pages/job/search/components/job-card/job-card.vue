<template>
  <wd-card custom-style="box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);">
    <template #title>
      <view class="flex justify-between">
        <view class="max-w-2/3 truncate text-xl font-bold">{{ job.title }}</view>
        <view class="max-w-1/3 truncate text-base text-blue">{{ job.salary }}</view>
      </view>
    </template>

    <view class="flex flex-col justify-between">
      <view class="flex justify-between">
        <view class="flex space-x-1 mb-2 text-gray">
          <view>
            <wd-icon name="location"></wd-icon>
            {{ job.cityName }}
          </view>
          <view v-for="label in job.jobLabels" :key="label">
            <wd-icon name="tips"></wd-icon>
            {{ label }}
          </view>
        </view>
        <view>
          {{ job.companyName }}
        </view>
      </view>
      <view class="flex space-x-1 space-y-0.5 flex-wrap">
        <wd-tag type="primary" v-for="label in job.jobSkills" :key="label">
          {{ label }}
        </wd-tag>
      </view>
    </view>
    <template #footer>
      <view class="flex items-center justify-between">
        <view class="text-sm text-gray">更新时间：{{ job.updateTime }}</view>
        <view><wd-button size="small" @click="goToDetail(job.id)">查看详情</wd-button></view>
      </view>
    </template>
  </wd-card>
</template>

<script lang="ts" setup>
import { JobItemType } from '@/service/job'

defineProps<{ job: JobItemType }>()

function goToDetail(id: string) {
  uni.navigateTo({
    url: `/pages/job/detail/index?id=${id}`,
  })
}
</script>

<style lang="scss" scoped></style>
