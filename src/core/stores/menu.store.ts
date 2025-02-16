import { defineStore } from 'pinia'
import { useAuthService } from '@/core/services/auth.service'
import type { AuthDTO } from '@/core/types/auth.model'
import { useLocalStorage } from '@vueuse/core'
import { computed, h, reactive } from 'vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { ItemType } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

export const useMenuStore = defineStore('menu', () => {
  const { t } = useI18n()
  const menuItems: ItemType[] = reactive([
    {
      key: 'TheDashboard',
      label: 'Dashboard',
      icon: () => h(Icon, { icon: 'tabler:layout-dashboard' }),
    },
    {
      key: 'TheUsers',
      label: 'Users',
      icon: () => h(Icon, { icon: 'tabler:users' }),
    },
    { type: 'divider' },
    {
      key: 'TheSettings',
      label: t('menus.settings'),
      icon: () => h(Icon, { icon: 'tabler:settings' }),
    },
  ])
  return { menuItems }
})
