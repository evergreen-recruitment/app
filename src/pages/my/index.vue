<route lang="json5" type="page">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="pt-40 text-xl text-center text-green-500">
    <template v-if="userStore.userState.isLogin">
      <view>已登录</view>
    </template>
    <template v-else>
      <view>未登录</view>
      <wd-button @click="goToLogin">去登录</wd-button>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()
function goToLogin() {
  uni.navigateTo({ url: '/pages/auth/loginByCaptcha/index' })
}
</script>

<style lang="scss" scoped>
//
</style>
