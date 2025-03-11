import type { IAuth } from '@/core/interfaces/auth.interface'
import { useBrandService } from '@/services/brand.service'
import { useMutation } from '@tanstack/vue-query'

export const useBrandQuery = () => {
  const brandService = useBrandService()

  // درخواست برای گرفتن همه برندها
  const getAllBrand = useMutation({
    mutationKey: ['brands', 'getAll'], // کلید منحصر به فرد
    mutationFn: brandService.getAllBrand, // تابع مربوطه
  })

  // درخواست برای گرفتن برند خاص
  const getBrand = useMutation({
    mutationKey: ['brands', 'getById'],
    mutationFn: brandService.getBrand,
  })

  // درخواست برای ایجاد برند جدید
  const createBrand = useMutation({
    mutationKey: ['brands', 'create'],
    mutationFn: brandService.createBrand,
  })

  // درخواست برای بروزرسانی برند
  const updateBrand = useMutation({
    mutationKey: ['brands', 'update'],
    mutationFn: ({ id, body }: { id: IAuth.Login.Request; body: IAuth.Login.Request }) =>
      brandService.updateBrand(id, body), // فراخوانی متد با دو پارامتر
  })

  // درخواست برای حذف برند
  const deleteBrand = useMutation({
    mutationKey: ['brands', 'delete'],
    mutationFn: brandService.deleteBrand,
  })

  return { getAllBrand, getBrand, createBrand, updateBrand, deleteBrand }
}
