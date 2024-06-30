<template>
  <wd-card custom-style="box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);" :title="job.companyName">
    <view class="flex h-20">
      <image class="rounded-2 mr-2 w-18 h-18" :src="job.companyVO.logo" mode="aspectFit" />
      <view class="flex flex-col justify-between">
        <view>
          <view class="text-sm text-black">{{ job.title }}</view>
          <view class="text-sm-1">{{ job.cityName }}</view>
        </view>
        <view>更新时间：{{ job.updateTime }}</view>
      </view>
    </view>
    <template #footer>
      <view class="flex justify-between">
        <view>
          <wd-tag
            custom-class="ml-1"
            v-for="label in job.jobLabels"
            type="primary"
            round
            :key="label"
          >
            {{ label }}
          </wd-tag>
        </view>
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
