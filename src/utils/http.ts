import { CustomRequestOptions } from '@/interceptors/request'
import { useUserStore } from '@/store'

const errCode = {
  40000: '请求参数错误',
  40001: '请求数据为空',
  40100: '未登录',
  40101: '无权限',
  40301: '访问屏蔽',
  50000: '系统内部异常',
}

export const http = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          const data = res.data as IResData<T>
          // 2.2 处理业务错误(后端定义的业务错误码)
          const msg = data?.msg || errCode[data?.code as keyof typeof errCode]
          const userStore = useUserStore()
          if (data?.code !== 200) {
            if (data.code === 40100) {
              userStore.logout()
              uni.navigateTo({ url: '/pages/auth/loginByCaptcha/index' })
            }
            if (msg) {
              uni.showToast({
                title: msg,
                icon: 'none',
              })
              return null
            }
          }
          if (msg) {
            uni.showToast({
              title: msg,
              icon: 'none',
            })
          }
          resolve(data)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          // userStore.clearUserInfo()
          // uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast &&
            uni.showToast({
              icon: 'none',
              title: (res.data as IResData<T>).msg || '请求错误',
            })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url: string, query?: Record<string, any>) => {
  return http<T>({
    url,
    query,
    method: 'GET',
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpPost = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'POST',
  })
}

http.get = httpGet
http.post = httpPost
