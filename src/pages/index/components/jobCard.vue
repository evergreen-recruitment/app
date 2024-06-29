<template>
  <wd-card :title="job.companyName">
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
          <wd-tag custom-class="ml-1" v-for="label in job.jobLabels" type="primary" round>
            {{ label }}
          </wd-tag>
        </view>
        <view><wd-button size="small">查看详情</wd-button></view>
      </view>
    </template>
  </wd-card>
</template>

<script lang="ts" setup>
import { JobItemType } from '@/service/job'

defineProps<{ job: JobItemType }>()
</script>

<style lang="scss" scoped></style>
