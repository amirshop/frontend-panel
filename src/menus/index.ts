import type { ItemType } from 'ant-design-vue'
import { computed, h, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

export const useMenus = () => {
  const { t } = useI18n()
  const menuItems = computed<ItemType[]>(() => [
    {
      key: 'TheTest',
      label: t('test'),
      icon: () => h(Icon, { icon: 'tabler:layout-dashboard', height: 18 }),
    },
    {
      key: 'TheDashboard',
      label: t('dashboard'),
      icon: () => h(Icon, { icon: 'tabler:layout-dashboard', height: 18 }),
    },
    { type: 'divider' },

    {
      key: 'TheMedia',
      label: t('mediaList'),
      icon: () => h(Icon, { icon: 'fluent-mdl2:photo-video-media', height: 18 }),
      children: [
        {
          key: 'TheMedia',
          label: t('media'),
          icon: () => h(Icon, { icon: 'fluent-mdl2:photo-video-media', height: 18 }),
        },
      ],
    },
    { type: 'divider' },

    {
      key: 'TheCustomers',
      label: t('customers'),
      icon: () => h(Icon, { icon: 'tabler:users', height: 18 }),
      children: [
        {
          key: 'TheCustomers',
          label: t('customers'),
          icon: () => h(Icon, { icon: 'tabler:users', height: 18 }),
        },
      ],
    },

    {
      key: 'TheAccounts',
      label: t('accounts'),
      icon: () => h(Icon, { icon: 'tabler:users', height: 18 }),
      children: [
        {
          key: 'TheAccounts',
          label: t('accounts'),
          icon: () => h(Icon, { icon: 'tabler:user', height: 18 }),
        },
        {
          key: 'ThePermissions',
          label: t('permissions'),
          icon: () => h(Icon, { icon: 'tabler:key', height: 18 }),
        },
        {
          key: 'TheRoles',
          label: t('roles'),
          icon: () => h(Icon, { icon: 'tabler:shield-check', height: 18 }),
        },
      ],
    },
    {
      key: 'TheProducts',
      label: t('products'),
      icon: () => h(Icon, { icon: 'fluent-mdl2:product-variant', height: 18 }),
      children: [
        {
          key: 'TheProducts',
          label: t('products'),
          icon: () => h(Icon, { icon: 'fluent-mdl2:product-variant', height: 18 }),
        },
        {
          key: 'TheCategories',
          label: t('categories'),
          icon: () => h(Icon, { icon: 'tabler:grid', height: 18 }),
        },
        {
          key: 'TheBrands',
          label: t('brands'),
          icon: () => h(Icon, { icon: 'tabler:brand-appstore', height: 18 }),
        },
        {
          key: 'TheAttributes',
          label: t('attributes'),
          icon: () => h(Icon, { icon: 'pajamas:issue-type-feature', height: 18 }),
        },
        {
          key: 'TheOptions',
          label: t('options'),
          icon: () => h(Icon, { icon: 'tabler:checkbox', height: 18 }),
        },
        {
          key: 'TheReviews',
          label: t('reviews'),
          icon: () => h(Icon, { icon: 'tabler:star', height: 18 }),
        },
        {
          key: 'TheTags',
          label: t('tags'),
          icon: () => h(Icon, { icon: 'tabler:tag', height: 18 }),
        },
      ],
    },
    {
      key: 'TheOrders',
      label: t('orders'),
      icon: () => h(Icon, { icon: 'material-symbols:orders-outline-rounded', height: 18 }),
      children: [
        {
          key: 'TheOrdersList',
          label: t('orders'),
          icon: () => h(Icon, { icon: 'tabler:git-pull-request', height: 18 }),
        },
      ],
    },

    { type: 'divider' },
    {
      key: 'TheUsers',
      label: t('users'),
      icon: () => h(Icon, { icon: 'tabler:users', height: 18 }),
      children: [
        {
          key: 'TheUsers',
          label: t('users'),
          icon: () => h(Icon, { icon: 'tabler:users', height: 18 }),
        },
      ],
    },
    {
      key: 'TheShopSettings',
      label: t('shopSettings'),
      icon: () => h(Icon, { icon: 'mdi:shop-settings-outline', height: 18 }),
      children: [
        {
          key: 'TheShopSettingsGeneral',
          label: t('general'),
          icon: () => h(Icon, { icon: 'tabler:settings', height: 18 }),
        },
        {
          key: 'TheShopSettingsHeader',
          label: t('header'),
          icon: () => h(Icon, { icon: 'fluent-mdl2:header', height: 18 }),
        },
        {
          key: 'TheShopSettingsFooter',
          label: t('footer'),
          icon: () => h(Icon, { icon: 'fluent-mdl2:footer', height: 18 }),
        },
      ],
    },
  ])
  return { menuItems }
}
