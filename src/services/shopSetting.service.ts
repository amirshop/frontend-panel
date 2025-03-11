import type { IShopSetting } from '@/interfaces/settings/setting.interface'
import { useHttp } from '@/core/services/http.composable'

export const useShopSettingService = () => {
  const createSetting = async (
    accountId: IShopSetting.Create.Param,
    setting: IShopSetting.Create.Request,
  ) => {
    return await useHttp<IShopSetting.Create.Response>({
      method: 'GET',
      url: `/settings/${accountId}`,
      body: setting,
    })
  }
  const updateSetting = async (
    accountId: IShopSetting.Update.Param,
    setting: IShopSetting.Update.Request,
  ) => {
    return await useHttp<IShopSetting.Update.Response>({
      method: 'POST',
      url: `/settings/${accountId}`,
      body: setting,
    })
  }
  const getSetting = async (accountId: IShopSetting.Get.Param) => {
    return await useHttp<IShopSetting.Get.Response>({
      method: 'GET',
      url: `/settings/${accountId}`,
    })
  }

  const deleteSetting = async (accountId: IShopSetting.Delete.Param) => {
    return await useHttp<IShopSetting.Delete.Response>({
      method: 'GET',
      url: `/settings/${accountId}`,
    })
  }

  return { getSetting, createSetting, updateSetting, deleteSetting }
}
