import type { IAuth } from '@/core/interfaces/auth.interface'
import { useHttp } from '@/core/services/http.composable'

export const useAuthService = () => {
  const login = async () => {
    return await useHttp<IAuth.Login.Request, IAuth.Login.Response>({
      method: 'POST',
      url: 'auth/login',
    })
  }
  const register = async (body: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'POST',
      url: 'auth/register',
      body,
    })
  }
  const verify = async () => {
    return await useHttp<IAuth.Login.Request, IAuth.Login.Response>({
      method: 'GET',
      url: 'auth/verify',
    })
  }

  return { login, register, verify }
}
