import type { ItemType } from 'ant-design-vue'
import { h, reactive } from 'vue'
import { Icon } from '@iconify/vue'

export const menuItems: ItemType[] = reactive([
  {
    key: 'TheDashboard',
    label: 'Dashboard',
    icon: () => h(Icon, { icon: 'tabler:layout-dashboard' }),
  },
  { type: 'divider' },

  {
    key: 'TheSettings',
    label: 'Settings',
    icon: () => h(Icon, { icon: 'tabler:settings' }),
    children: [
      {
        key: 'TheDashboard',
        label: 'Dashboard',
        icon: () => h(Icon, { icon: 'tabler:layout-dashboard' }),
      },
      { type: 'divider' },

      {
        key: 'TheDashboard',
        label: 'Dashboard',
        icon: () => h(Icon, { icon: 'tabler:layout-dashboard' }),
      },
      {
        key: 'TheDashboard',
        label: 'Dashboard',
        icon: () => h(Icon, { icon: 'tabler:layout-dashboard' }),
      },
    ],
  },
])
