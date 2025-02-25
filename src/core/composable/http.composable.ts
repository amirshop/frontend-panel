import { ref, computed, watchEffect, onUnmounted } from 'vue'
import axios from 'axios'
import { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import type { AuthDTO } from '@/core/types/auth.model'
import { useLocalStorage } from '@vueuse/core'
import { message } from 'ant-design-vue'

interface UseAxiosOptions<I, O> {
  method?: Method
  url: string
  query?: string
  body?: I // بدنه درخواست (Input)
  config?: Omit<AxiosRequestConfig, 'data'> // حذف `data` از `config`
  immediate?: boolean // آیا درخواست بلافاصله ارسال شود؟
}

const API_BASE_URL = import.meta.env.VITE_APP_API_URL

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

// مدیریت توکن احراز هویت
const storage = useLocalStorage('User', {} as AuthDTO.User)
const authToken = computed(() => {
  return storage.value.tokenType && storage.value.accessToken
    ? `${storage.value.tokenType} ${storage.value.accessToken}`
    : ''
})

// تنظیم توکن در هر درخواست
axiosInstance.interceptors.request.use((config) => {
  if (authToken.value) {
    config.headers.Authorization = authToken.value
  }
  return config
})

// مدیریت خطاهای پاسخ
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const data = error.response?.data
    message.error(data?.message || 'خطایی پیش آمده است، لطفاً دوباره تلاش کنید.')
    return Promise.reject(data)
  },
)

export function useHttp<I = unknown, O = unknown>({
  method = 'get',
  url,
  query = '',
  body, // بدنه درخواست (Input)
  config = {},
  immediate = true,
}: UseAxiosOptions<I, O>) {
  const responseData = ref<O | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const controller = ref<AbortController | null>(null)

  const execute = async (overrideConfig: AxiosRequestConfig = {}) => {
    loading.value = true
    error.value = null
    controller.value = new AbortController()

    try {
      const response: AxiosResponse<O> = await axiosInstance.request<O>({
        method,
        url: url + query,
        signal: controller.value.signal,
        data: body, // ارسال body از نوع I
        ...config,
        ...overrideConfig,
      })
      console.log('response')
      console.log(response)
      console.log('response')

      responseData.value = response.data
      return response.data
    } catch (err) {
      error.value = (err as AxiosError).message
      return null
    } finally {
      loading.value = false
    }
  }

  // اجرای خودکار اگر immediate فعال باشد
  if (immediate && body !== undefined) {
    watchEffect(() => {
      execute()
    })
  }

  // لغو درخواست هنگام خروج از کامپوننت
  onUnmounted(() => {
    controller.value?.abort()
  })

  return {
    data: responseData,
    error,
    loading,
    execute: (newBody?: I) => execute({ data: newBody ?? body }), // امکان ارسال مقدار جدید
  }
}
