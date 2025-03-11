import { defineStore } from 'pinia'
import type { IAuth } from '@/core/interfaces/auth.interface'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { useAuthQuery } from '@/core/queries/useAuth.query'

export const useAuthStore = defineStore('auth', () => {
  // const authQuery = useAuthQuery()
  const authToken = useLocalStorage<string>('authToken', '')
  const userStorage = useLocalStorage('User', {} as IAuth.Login.Response)
  const login = async (dto: IAuth.Login.Request) => {
    // const { data, execute, loading, error } = authQuery.login.mutate()
    // try {
    //   await execute(dto)
    //   userStorage.value = data.value
    // } catch (error) {
    //   throw new Error('Error while fetching login')
    // }
  }
  const logout = () => {
    userStorage.value = {} as IAuth.Login.Response
  }
  const currentUser = computed(() => userStorage.value)

  return { currentUser, login, logout, authToken }
})
