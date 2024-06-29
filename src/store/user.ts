import { getUserInfoApi, type UserInfoType } from '@/service/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getExpiredStorage } from '@/store'
import { useCookies } from 'vue3-cookies'
import { logoutApi } from '@/service/auth'

const { cookies } = useCookies()
const expiresTime = 60 * 30
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')
    const userInfo = ref<UserInfoType>({})
    const userState = ref({
      isLogin: false,
      isCompleteInfo: false,
      isUploadApplication: false,
    })
    async function getUserState() {
      userState.value.isLogin = !!token.value
      if (!userState.value.isLogin) {
        userState.value.isCompleteInfo = false
        userState.value.isUploadApplication = false
      }
      // userState.value.isCompleteInfo = await isCompleteUserInfoApi()
      // userState.value.isUploadApplication = await isUploadApplicationApi()
    }
    async function getUserInfo() {
      token.value = cookies.get('satoken') || ''
      cookies.set('satoken', token.value, expiresTime)
      userInfo.value = (await getUserInfoApi()).data
    }

    // async function updateUserInfo(newUserInfo: UpdateUserInfoFormType) {
    //   const res = await updateUserInfoApi(newUserInfo)
    //   if (res !== true) {
    //     return false
    //   }
    //   await getUserInfo()
    //   return true
    // }

    async function logout() {
      token.value = ''
      userInfo.value = {}
      cookies.remove('satoken')
      await logoutApi()
      await getUserState()
    }
    return {
      token,
      userInfo,
      userState,
      getUserState,
      getUserInfo,
      // updateUserInfo,
      logout,
    }
  },
  {
    persist: { storage: getExpiredStorage(expiresTime), debug: true },
  },
)
