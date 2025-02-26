import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'TheDashboard',
    component: () => import('@/views/dashboard/Index.vue'),
  },
  {
    path: '/media',
    name: 'TheMedia',
    component: () => import('@/views/media/Index.vue'),
  },
  {
    path: '/users',
    name: 'TheUsers',
    component: () => import('@/views/users/Index.vue'),
  },
  {
    path: '/products',
    name: 'TheProducts',
    children: [
      {
        path: '',
        name: 'TheProductsList',
        component: () => import('@/views/products/products/Index.vue'),
      },
      {
        path: 'categories',
        name: 'TheCategories',
        component: () => import('@/views/products/categories/Index.vue'),
      },
      {
        path: 'brands',
        name: 'TheBrands',
        component: () => import('@/views/products/brands/Index.vue'),
      },
      {
        path: 'attributes',
        name: 'TheAttributes',
        component: () => import('@/views/products/attributes/Index.vue'),
      },
      {
        path: 'options',
        name: 'TheOptions',
        component: () => import('@/views/products/options/Index.vue'),
      },
      {
        path: 'tags',
        name: 'TheTags',
        component: () => import('@/views/products/tags/Index.vue'),
      },
      {
        path: 'reviews',
        name: 'TheReviews',
        component: () => import('@/views/products/reviews/Index.vue'),
      }
    ],
  },
  {
    path: '/orders',
    name: 'TheOrders',
    children: [
      {
        path: '',
        name: 'TheOrdersList',
        component: () => import('@/views/orders/Index.vue'),
      },
    ],
  },
  {
    path: '/shop-settings',
    name: 'TheShopSettings',
    children: [
      {
        path: '',
        name: 'TheShopSettingsGeneral',
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
