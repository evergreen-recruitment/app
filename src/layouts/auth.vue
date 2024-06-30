<template>
  <wd-config-provider :themeVars="themeVars">
    <view class="logo block w-full h-20 pt-10">
      <image class="w-full h-full" src="/static/images/logo1-black.png" mode="aspectFit" />
    </view>
    <view class="container relative p-3 box-border h-[80vh] overflow-y-auto">
      <slot />
    </view>
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
</script>
