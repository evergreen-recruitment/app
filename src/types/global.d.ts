declare const __UNI_PLATFORM__:
  | 'h5'
  | 'app'
  | 'mp-alipay'
  | 'mp-baidu'
  | 'mp-jd'
  | 'mp-kuaishou'
  | 'mp-lark'
  | 'mp-qq'
  | 'mp-toutiao'
  | 'mp-weixin'
  | 'quickapp-webview'
  | 'quickapp-webview-huawei'
  | 'quickapp-webview-union'

declare const __VITE_APP_PROXY__: 'true' | 'false'

declare type PageType<T> = {
  records: T[]
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  searchCount: boolean
  countId?: any
  maxLimit?: any
  pages: number
}

declare type PageRequestType = {
  current?: number
  pageSize?: number
  sortField?: string
  sortOrder?: string
}
