import { useRequest } from 'vue-request';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // تنظیم کن بر اساس نیاز
  timeout: 10000,
});

export function useHttp<T>(url: string, options?: any) {
  return useRequest<T>(() => axiosInstance.get(url).then((res) => res.data), options);
}
