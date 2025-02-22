import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useShopSettingsStore = defineStore('Shop settings', () => {
  const settingList = ref({
    shopName: '',
    shopLogo: '',
    shopFavicon: '',
  })

  return { settingList }
})
