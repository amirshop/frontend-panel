import type { IShopSetting } from '@/interfaces/settings/setting.interface'
import { useShopSettingService } from '@/services/shopSetting.service'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

export const useShopSettingQuery = () => {
  const shopSettingService = useShopSettingService()
  const queryClient = useQueryClient()

  // Fetch shop setting
  const getSetting = (accountId: IShopSetting.Get.Param) => {
    return useQuery({
      queryKey: ['shopSetting', accountId],
      queryFn: () => shopSettingService.getSetting(accountId),
    })
  }

  // Create shop setting
  const createSetting = useMutation({
    mutationFn: ({
      accountId,
      setting,
    }: {
      accountId: IShopSetting.Create.Param
      setting: IShopSetting.Create.Request
    }) => shopSettingService.createSetting(accountId, setting),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopSetting'] })
    },
    onError: (error) => {
      console.error('Error creating shop setting:', error)
    },
  })

  // Update shop setting
  const updateSetting = useMutation({
    mutationFn: ({
      accountId,
      setting,
    }: {
      accountId: IShopSetting.Update.Param
      setting: IShopSetting.Update.Request
    }) => shopSettingService.updateSetting(accountId, setting),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopSetting'] })
    },
    onError: (error) => {
      console.error('Error updating shop setting:', error)
    },
  
    
  })

  // Delete shop setting
  const deleteSetting = useMutation({
    mutationFn: (accountId: IShopSetting.Delete.Param) =>
      shopSettingService.deleteSetting(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopSetting'] })
    },
    onError: (error) => {
      console.error('Error deleting shop setting:', error)
    },
  })

  return {
    getSetting,
    createSetting,
    updateSetting,
    deleteSetting,
  }
}
