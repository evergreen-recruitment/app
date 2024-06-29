<route lang="json5" type="loginByCaptcha">
{
  layout: 'auth',
  style: {
    navigationStyle: 'custom',
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
