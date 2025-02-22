import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useShopSettingsStore = defineStore('Shop settings', () => {
  const settingList = ref({
    name: '',
    logo: '',
    favicon: '',
    description: '',
    slug: '',
  })

  return { settingList }
})
