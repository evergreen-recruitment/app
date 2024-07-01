## 常青招聘UniApp

> 常青招聘前端项目拓展，目前仅做展示作用
>
> 常青招聘：https://eh.healwrap.cn

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/358c4389fe35ec9f6dbaee805e03b0bb.png)

项目基于unibest模板开发https://github.com/codercup/unibest

使用包括

1. Vue3
2. UniApp
3. Wot Design UI
4. UnoCSS
5. 约定式路由

项目适配了多端(目前是H5和安卓)

项目的仓库地址为https://github.com/evergreen-recruitment/app，该项目的前端和移动端作者均为<我> (pepedd864)

> **选题、需求、设计、实现等，参考PPT和设计文档**

### 1. 项目介绍

项目目前实现了：

- 首页(热门公司推荐、岗位推荐)
- 岗位详情(岗位基本信息、公司信息、岗位详情介绍、HR信息、位置信息-地图模块)
- 岗位搜索(目前支持使用关键词搜索，其他搜索条件可到网页端查看)
- 登录界面(手机短信验证登录)

| ![f6d4712f9d6b297e27c1795ecd1f548](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/b3a194b0da860a427f489ac9198ac1aa.jpg) | ![1b3d2ff3d72ac6864334970fdc38893](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/00129085be4ec89060640b36d0876a83.jpg) |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ![539d2521201e6e5612ee10e72b8ec4a](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/d3a2623c268893684aa4c0418d7a9a84.jpg) | ![1a1d3ab2efb55b2b0e8279093043d1c](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/5f744a5571dcbc9d23e7a18e080f5156.jpg) |

由于开发周期较短，功能完善度可能不是很好，某些功能可能不可用(目前已知登录，由于后端使用cookie登录，在这里使用会有跨域问题，无法携带cookie，导致无法登录)

### 2. 详细实现

**开发起步：**

> 由于UniApp的开发体验非常不好、配套HBuilderX开发缺少代码提示(提示功能很差)、无代码格式化功能，代码报错提示不佳等等问题
>
> 故**使用命令行脚手架方式开发**，该开发方式运行开发者灵活使用编辑器或开发环境进行开发，最终只需要在HBuilder中进行打包运行调试等等操作。
>
> 而手动配置开发环境是比较麻烦的事情，如选择包管理器(一般选用pnpm)、选择打包调试工具(一般选用Vite)、类型提示约束较好的语言(TypeScript)、代码规范(ESLint)、代码格式化(Prettier)、使用Git管理代码、Git提交信息规范(CommitLint)等等

**模板选择**

- 考虑众多因素，最终选择**使用unibest的自定义tabbar模板**作为项目初始模板

![unibest templates](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/203701bf5b4258e73494e5ffb5973781.png)

**代码托管**

- 代码托管在Github的evergreen-recruitment组织下，前端和移动端版本开发者均为我个人

**代码描述**

- 主要使用Vue3进行开发、为了提供更好的类型提示和约束，使用了TypeScript语言
- 跨端框架使用UniApp，使用其中较多API
- UI框架使用Wot Design UI，这是一个对跨端支持较完整的框架
- CSS使用了Sass作为预处理器，同时使用UnoCSS作为原子化CSS框架，简化CSS书写

### 3. 代码详细

#### 3.1 Unibest模板内容

- 前端基础配置六件套
  - prettier
  - eslint
  - stylelint
  - husky
  - lint-staged
  - commitlint
- UnoCSS
- UnoCSS Icons
- Uni 插件
  - vite-plugin-uni-pages
  - vite-plugin-uni-layouts
  - vite-plugin-uni-manifest
  - vite-plugin-uni-platform
- UI 库（默认 `wot-ui`，支持替换其他 `UI库`)
- pinia + pinia-plugin-persistedstate
- 通用功能
  - 请求封装
  - 请求拦截
  - 路由拦截

#### 3.2 **目录结构**（主要的部分，含解释）

```
app
├── env									// 各种环境的变量文件
│   ├── .env
│   ├── ...
├── scripts								// npm包的脚本、这里只有一个更新依赖版本的脚本
│   └── postupgrade.js
├── src
│   ├── components						// 公共组件
│   │   ├── fg-tabbar
│   │   │   ├── fg-tabbar.vue
│   │   │   └── tabbar.ts
│   ├── hooks							// 一些封装的hooks，可以快捷操作
│   │   ├── useRequest.ts
│   │   └── useUpload.ts
│   ├── interceptors					// 拦截器
│   │   ├── index.ts
│   │   ├── prototype.ts
│   │   ├── request.ts
│   │   └── route.ts
│   ├── layouts							// 布局文件，适应应用各种页面的要求
│   │   ├── auth.vue
│   │   ├── default.vue
│   │   ├── demo.vue
│   │   └── tabbar.vue
│   ├── pages							// 应用的各个页面
│   │   ├── auth
│   │   │   └── loginByCaptcha
│   │   │       └── index.vue
│   │   ├── index
│   │   │   ├── components
│   │   │   │   └── job-card
│   │   │   │       └── job-card.vue
│   │   │   └── index.vue
│   │   ├── job
│   │   │   ├── detail
│   │   │   │   └── index.vue
│   │   │   └── search
│   │   │       ├── components
│   │   │       │   └── job-card
│   │   │       │       └── job-card.vue
│   │   │       └── index.vue
│   │   └── my
│   │       └── index.vue
│   ├── pages-sub							// 小程序分包文件夹
│   │   └── demo
│   │       └── index.vue
│   ├── service								// 接口定义，放在这个文件夹下
│   │   ├── auth.ts
│   │   ├── common.ts
│   │   ├── company.ts
│   │   ├── employee.ts
│   │   ├── job.ts
│   │   └── user.ts
│   ├── static								// 静态资源
│   │   ├── app
│   │   │   └── icons 						// 应用图标
│   │   │       ...
│   │   ├── images							// 图片资源
│   │   │   ├── ...
│   │   └── logo.svg
│   ├── store								// 使用pinia管理全局状态
│   │   ├── ...
│   ├── style								// 应用全局样式
│   │   └── ...
│   ├── types								// ts类型
│   │   ├── ...
│   ├── uni_modules
│   ├── utils 								// 工具库
│   │   ├── ...
│   ├── ...入口文件和一些UniApp配置文件等等
├── ... 其他项目配置文件，这里省略
```

#### 3.3 工作量

因为是基于模板进行开发，所以我的工作量主要集中于

- 页面开发
- 布局文件
- 定义接口请求
- 定义接口返回值类型
- 编写UnoCSS样式

还有一部份工作量包括

- 修改项目部分配置文件
- 引入地图模块
- 等等

具体可参考Git提交信息

![image-20240701204405399](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/fd904259502c4bb1e501b546543677d4.png)

#### 3.4 核心页面代码

**核心页面代码**（这里只是展示最核心、包含工作量最大的部分、它还包括很多外部的代码或配置）

- **登录界面**

> 这里`route`标签下的内容为约定式路由定义，可让开发者在页面中进行快捷定义，而不需要在UniApp的`pages.json`文件中配置，使用插件`vite-plugin-uni-pages`实现
>
> `template`标签下主要定义了登录表单，同时使用了`UnoCSS`的原子类名添加样式
>
> `script`标签下主要定义了表单变量、表单元素`Ref`、表单校验规则、发送验证码(验证码倒计时)、登录功能
>
> 由于后端使用的是`Cookie`登录，这里会存在跨域问题，导致无法登录，所以只是实现了基本功能

```vue
<route lang="json5" type="loginByCaptcha">
{
  layout: 'auth',
  style: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="login-view">
    <view class="title text-2xl font-bold text-center mb-2">手机号登录</view>
    <wd-form ref="formRef" :model="modelState" :rules="rules">
      <wd-input
        label="手机号"
        label-width="100px"
        size="large"
        prop="phone"
        clearable
        v-model="modelState.phone"
        placeholder="请输入手机号"
      />
      <wd-input
        label="验证码"
        label-width="100px"
        size="large"
        prop="verifyCode"
        clearable
        v-model="modelState.verifyCode"
        placeholder="请输入验证码"
        use-suffix-slot
      >
        <template #suffix>
          <wd-button type="text" :disabled="countdown > 0" @click="sendCode">
            {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
          </wd-button>
        </template>
      </wd-input>
      <view class="overflow-hidden">
        <wd-button class="float-left" type="text">使用密码登录</wd-button>
        <wd-button class="float-right" type="text">忘记密码？</wd-button>
      </view>
      <br />
      <wd-button block @click="login">登录</wd-button>
      <wd-checkbox class="mt-10" v-model="modelState.privacy" shape="square" prop="privacy">
        已阅读并同意常青招聘
        <wd-button type="text">《用户协议》《隐私政策》</wd-button>
      </wd-checkbox>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { loginByCaptchaApi } from '@/service/auth'
import { sendSMSApi } from '@/service/common'
import { useUserStore } from '@/store'
import { FormRules } from 'wot-design-uni/components/wd-form/types'
const formRef = ref(null)
const userStore = useUserStore()
const modelState = ref({
  phone: '15374284973',
  verifyCode: '1234',
  privacy: false,
})

const rules: FormRules = {
  phone: [{ required: true, message: '请填写手机号' }],
  verifyCode: [{ required: true, message: '请填写验证码' }],
  privacy: [
    {
      required: true,
      message: '请同意用户协议',
      validator(value, rule) {
        if (!value) {
          uni.showToast({
            icon: 'none',
            title: '请同意用户协议',
          })
          return false
        }
        return true
      },
    },
  ],
}

const countdown = ref(0)
function sendCode() {
  // 发送验证码逻辑
  formRef.value.validate('phone').then(async ({ valid }) => {
    if (valid) {
      const res = await sendSMSApi(modelState.value.phone)
      if (!res) {
        uni.showToast({
          icon: 'none',
          title: '发送失败',
        })
        return
      }
      countdown.value = 60
      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    }
  })
}

const login = () => {
  // 登录逻辑
  formRef.value.validate().then(async ({ valid }) => {
    if (valid) {
      const data = await (await loginByCaptchaApi(modelState.value)).data
      if (data) {
        userStore.token = data.token
        userStore.userInfo = data.userVO
        // const res = await isCompleteUserInfoApi()
        // if (res === false) {
        //   router.push({
        //     name: 'completeInfo',
        //     query: {
        //       userId: data.userVO.id,
        //     },
        //   })
        //   return
        // }
        uni.showToast({
          title: '登录成功',
          icon: 'none',
        })
        // 跳转到首页
        uni.navigateBack()
      }
    }
  })
}
</script>
```

- 首页

> `route`标签的功能如上文所述，这里不再解释
>
> `template`标签下的内容主要是定义了页面头部(包括Logo、文字)、页面中热门公司Logo轮播图、推荐岗位(热门岗位、最新岗位、附近岗位)、定义了岗位信息卡片组件（在`./components/job-card/job-card.vue`文件中）
>
> `script`标签中定义了获取热门公司接口函数、获取附件岗位接口函数
>
> `style`标签中定义了轮播图样式和tab标签sticky的样式，背景为高斯模糊

```vue
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
```

- 岗位详情页

> `template`标签下主要定义了岗位详情信息展示的布局
>
> 包括：
>
> - 岗位基本信息
> - 公司信息
> - 岗位详情介绍
> - HR信息
> - 位置信息-地图模块
>
> `script`标签中主要定义了UniApp的地图组件配置、获取岗位详情信息函数

```vue
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
```

- 岗位搜索

> 主要是布局代码、搜索表单信息、搜索筛选条件信息(未实现)、搜索函数
>
> TODO：搜索接口是分页的、**移动端主要使用下拉加载和虚拟列表的方式展示，这个可作为以后拓展的点**

```vue
<route lang="json5" type="jobSearch">
{
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '岗位搜索',
  },
}
</route>

<template>
  <view>
    <wd-search
      custom-class="sticky top-0 z-10"
      v-model="searchState.keyword"
      placeholder="输入岗位关键词"
      placeholder-left
      focus
      hide-cancel
      @search="getSearchResult"
    ></wd-search>
    <view class="mt-4">
      <job-card v-for="job in jobList" :job="job" :key="job.id"></job-card>
    </view>
  </view>
</template>

<script lang="ts" setup>
import JobCard from './components/job-card/job-card'
import { JobFilterType, JobItemType, JobSearchFormType, jobSearchApi } from '@/service/job'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const jobList = ref<JobItemType[]>([])
const searchState = ref<JobSearchFormType>({
  keyword: '',
  city: 0,
  current: 1,
  pageSize: 10,
  sortField: '',
  sortOrder: '',
})
const jobFilterData = ref<JobFilterType>({
  jobStandardId: null,
  jobType: 0,
  experience: 0,
  salary: 0,
})
async function getSearchResult() {
  const res = (await jobSearchApi({ ...searchState.value, ...jobFilterData.value })).data
  if (res.records.length) {
    jobList.value = res.records as any
  } else {
    jobList.value = []
    uni.showToast({
      icon: 'none',
      title: '暂无数据',
    })
  }
}
</script>

<style lang="scss" scoped>
//
</style>
```

### 4. 部署部分

项目开发时适配了H5端和APP端，可使用UniApp的cli命令进行编译打包、APP的话可选使用HBuilder的云打包方式或者使用Andriod Studio自行编译（这里为了方便使用了云打包）。

![image-20240701211620327](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/55c7d60a4afcccaf6c0178846058fb7d.png)

#### 4.1 网页端部署

使用进行编译，在`dist/build/h5`下可见编译的文件

```
pnpm build:h5
```

![image-20240701211943109](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/e6fa9fd69534f4b6de58d9281acc1bdf.png)

服务器部署方面，可选用云服务提供商(如腾讯、阿里近些时候有便宜的2c2g服务器)的服务器

可选用宝塔面板实现可视化界面拖动即可部署

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/ad288cc5629da535fe0d4dc84c7857e5.png)

或者使用nginx（可选用其他如express等等），在终端使用命令进行部署

对于想要实现快捷部署，可选用CI/CD方案、如jenkins或者便捷的方法如：AliyunFLow、Github Actions等等，这里不展示。

#### 4.2 APP打包

同样使用命令编译，在`dist/build/app`下可见编译的文件

```
pnpm build:app
```

使用HbuilderX打开该文件夹，选择“原生APP-云打包”进行打包

![image-20240701212659452](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/91d2b86e6cb29963a1606ad90e602133.png)

其中如果缺少“应用标识AppID”或者缺少添加的模块，需要在`manifest.json`中再进行配置

![image-20240701212845126](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/602e834df54a9ed5a366f09e5fe258e8.png)

最终可在`unpackage`文件夹下见到编译好的`apk`文件

![image-20240701212942534](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/fe3206f16613f88f38eefcc8fb2609ac.png)
