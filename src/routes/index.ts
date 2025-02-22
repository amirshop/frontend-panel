import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '',
    name: 'TheDashboard',
    component: () => import('../views/dashboard/Index.vue'),
  },
  {
    path: 'media',
    name: 'TheMedia',
    component: () => import('../views/media/Index.vue'),
  },
  {
    path: '/users',
    name: 'TheUsers',
    component: () => import('../views/users/Index.vue'),
  },
  {
    path: '/products',
    name: 'TheProducts',
    component: () => import('../views/products/Index.vue'),
  },
  {
    path: '/orders',
    name: 'TheOrders',
    children: [
      {
        path: '',
        name: 'TheOrdersList',
        component: () => import('../views/orders/Index.vue'),
      },
    ],
  },
  {
    path: '/shop-settings',
    name: 'TheShopSettings',
    children: [
      {
        path: '',
        name: 'TheShopSettingsPublic',
        component: () => import('@/views/shop-settings/Index.vue'),
      },
      {
        path: 'footer',
        name: 'TheShopSettingsFooter',
        component: () => import('@/views/shop-settings/FooterSettings.vue'),
      },
      {
        path: 'header',
        name: 'TheShopSettingsHeader',
        component: () => import('@/views/shop-settings/HeaderSettings.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
