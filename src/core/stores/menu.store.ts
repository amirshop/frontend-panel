import { defineStore } from 'pinia'
import { computed, h, reactive } from 'vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { ItemType } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

export const useMenuStore = defineStore('menu', () => {
  const { t } = useI18n()
  const menuItems = computed<ItemType[]>(() => [
    {
      key: 'TheDashboard',
      label: t('dashboard'),
      icon: () => h(Icon, { icon: 'tabler:layout-dashboard', height: 18 }),
    },
    { type: 'divider' },
    {
      key: 'TheUsers',
      label: t('users'),
      icon: () => h(Icon, { icon: 'tabler:users', height: 18 }),
    },
    {
      key: 'TheProducts',
      label: t('products'),
      icon: () => h(Icon, { icon: 'fluent-mdl2:product', height: 18 }),
    },
    { type: 'divider' },
    {
      key: 'TheSettings',
      label: t('settings'),
      icon: () => h(Icon, { icon: 'tabler:settings', height: 18 }),
    },
  ])
  return { menuItems }
})
