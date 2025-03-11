import type { IAuth } from '@/core/interfaces/auth.interface'
import { useHttp } from '@/core/services/http.composable'

export const useBrandService = () => {
  const getAllBrand = async () => {
    return await useHttp<undefined, IAuth.Login.Response>({
      method: 'GET',
      url: `/brands`,
    })
  }
  const getBrand = async (id: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'GET',
      url: `/brands/${id}`,
    })
  }
  const createBrand = async (body: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'POST',
      url: `/brands`,
      body,
    })
  }
  const updateBrand = async (id: IAuth.Login.Request, body: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'PUT',
      url: `/brands/${id}`,
      body,
    })
  }
  const deleteBrand = async (id: IAuth.Login.Request) => {
    return await useHttp<IAuth.Register.Request, IAuth.Register.Response>({
      method: 'DELETE',
      url: `/brands/${id}`,
    })
  }

  return { getAllBrand, getBrand, createBrand, updateBrand, deleteBrand }
}
