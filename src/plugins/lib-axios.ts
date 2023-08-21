import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

import axios from 'axios'

export function transformUrl(url: string): string {
  url = `${
    import.meta.env.VITE_AXIOS_URL ? import.meta.env.VITE_AXIOS_URL : ''
  }${url}`
  return url
}

export interface Result<T = any> {
  resultCode: number
  resultDesc: string
  data: T
  page: {
    pageNo: number
    pageSize: number
    orderBy: string
    order: 'ASC' | 'DESC'
    count: number
    totalPage: number
  }
}

const serve: AxiosInstance = axios.create({
  withCredentials: false,
  timeout: 1000 * 60 * 60,
})

// 请求前拦截
serve.interceptors.request.use((config) => {
  config.url = transformUrl(config.url as string)
  // eslint-disable-next-line no-console
  console.log('config url: ', config.url)
  return config
})

// 请求响应拦截
serve.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    return new Promise((resolve, reject) => {
      const { resultCode } = res.data
      if (resultCode === 100)
        return resolve(res)

      return reject(res.data)
    })
  },
  (error) => {
    const { code, message } = error || {}
    const err: string = error?.toString?.() ?? ''
    let resultDesc = ''
    try {
      if (code === 'ECONNABORTED' && message.includes('timeout'))
        resultDesc = '接口请求超时，请刷新页面重试'

      if (err?.includes('Network Error'))
        resultDesc = '网络异常请检查你的网络链接是否正常'
    }
    catch (e) {
      throw new Error(e as unknown as string)
    }
    error.resultDesc = resultDesc
    return Promise.reject(error)
  },
)

function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    serve
      .request<any, AxiosResponse<Result>>(config)
      .then((res: AxiosResponse<Result>) => {
        const { data } = res.data
        if (data && Array.isArray(data))
          return resolve(res.data as unknown as Promise<T>)

        else
          resolve(res.data.data as Promise<T>)
      })
      .catch((e: Error | AxiosError) => {
        // const text = (e as unknown as Result).resultDesc;
        // if (text) MessageVue.error(text);
        reject(e)
      })
  })
}

export default request
