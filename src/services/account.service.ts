import type { IAuth } from '@/core/interfaces/'
import { useHttp } from '@/core/services/http.composable'

export const useAccountService = () => {
  const getAllAccount = async () => {
    return await useHttp<undefined, IAuth.Login.Response>({
      method: 'GET',
      url: `/accounts`,
    })
  }
  const getAccount = async (id: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'GET',
      url: `/accounts/${id}`,
    })
  }
  const createAccount = async (body: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'POST',
      url: `/accounts`,
      body,
    })
  }
  const updateAccount = async (id: IAuth.Login.Request, body: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'PUT',
      url: `/accounts/${id}`,
      body,
    })
  }
  const deleteAccount = async (id: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'DELETE',
      url: `/accounts/${id}`,
    })
  }

  return { getAllAccount, getAccount, createAccount, updateAccount, deleteAccount }
}
