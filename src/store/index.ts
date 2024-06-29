import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化

const store = createPinia()

store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }),
)

export function getExpiredStorage(expiresTime: string | number | Date) {
  return {
    getItem(key: string) {
      const itemStr = uni.getStorageSync(key)
      if (!itemStr) {
        return null
      }
      const item = JSON.parse(itemStr)
      const now = new Date()
      if (now.getTime() > item.expiry) {
        uni.removeStorageSync(key)
        return null
      }
      return JSON.stringify(item.value)
    },
    setItem(key: string, value: string) {
      const now = new Date()
      const item = {
        value: JSON.parse(value),
        expiry: now.getTime() + Number(expiresTime) * 1000,
      }
      uni.setStorageSync(key, JSON.stringify(item))
    },
    removeItem(key: string) {
      uni.removeStorageSync(key)
    },
    clear() {
      const keys = uni.getStorageInfoSync().keys
      keys.forEach((key: string) => {
        uni.removeStorageSync(key)
      })
    },
    key(index: number): string | null {
      const keys = uni.getStorageInfoSync().keys
      return keys[index] || null
    },
    length: uni.getStorageInfoSync().keys.length,
  }
}

export default store

// 模块统一导出
export * from './user'
