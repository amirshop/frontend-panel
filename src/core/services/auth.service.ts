import type { AuthDTO } from '@/core/types/auth.model'
import { useHttp } from '@/core/composable/http.composable'

export const useAuthService = () => {
  const login = useHttp<AuthDTO.Login.Request, AuthDTO.Login.Response>({
    method: 'POST',
    url: '/auth/signin',
    immediate: false,
  })

  return { login }
}
