import { useAuthService } from '@/core/services/auth.service'
import { useMutation } from '@tanstack/vue-query'

export const useAuthQuery = () => {
  const authService = useAuthService()

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: authService.login,
  })

  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: authService.register,
  })

  const verify = useMutation({
    mutationKey: ['verify'],
    mutationFn: authService.verify,
  })

  return { login, register, verify }
}
