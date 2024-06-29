<template>
  <wd-config-provider :themeVars="themeVars">
    <view :style="{ marginTop: safeAreaInsets?.top + 'px' }">
      <slot />
    </view>
    <!-- 注意下面，多了一个自定义tabbar -->
    <fg-tabbar />
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

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>
