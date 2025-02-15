import type { AuthDTO } from '@/core/types/auth.model'
import { useHttp } from '@/core/composables/http.composable'

export const useAuthService = () => {
  const login = useHttp<AuthDTO.Login.Request>({
    url: '/users',
    method: 'POST',
  })
  return { login }
}
