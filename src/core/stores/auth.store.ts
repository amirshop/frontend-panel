import { defineStore } from 'pinia'
import { useAuthService } from '@/core/services/auth.service'
import type { AuthDTO } from '@/core/types/auth.model'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const authService = useAuthService()
  const authToken = useLocalStorage<string>('authToken', '')
  const userStorage = useLocalStorage('User', {} as AuthDTO.Login.Response)
  const login = async (dto: AuthDTO.Login.Request) => {
    const { data, execute, loading, error } = authService.login
    try {
      await execute(dto)
      userStorage.value = data.value
    } catch (error) {
      throw new Error('Error while fetching login')
    }
  }
  const logout = () => {
    userStorage.value = {} as AuthDTO.Login.Response
  }
  const currentUser = computed(() => userStorage.value)

  return { currentUser, login, logout, authToken }
})
