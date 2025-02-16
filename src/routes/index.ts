import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '',
    name: 'TheDashboard',
    component: () => import('../views/dashboard/Index.vue'),
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
    component: () => import('../views/orders/Index.vue'),
  },
] as RouteRecordRaw[]
