import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '常青招聘',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      // '^fg-(.*)': '@/components/fg-$1.vue',
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      // 注意tabbar路由需要使用 layout:tabbar 布局
      {
        pagePath: 'pages/index/index',
        text: '首页',
        icon: 'home',
        iconType: 'wot',
      },
      {
        pagePath: 'pages/job/search/index',
        text: '搜索',
        icon: 'search1',
        iconType: 'wot',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        icon: 'user',
        iconType: 'wot',
      },
    ],
  },
})
