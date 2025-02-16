import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '',
    name: 'TheDashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
  },
  {
    path: '/users',
    name: 'TheUsers',
    component: () => import('../views/users/UsersIndex.vue'),
  },
  {
    path: '/products',
    name: 'TheProducts',
    component: () => import('../views/products/ProductsIndex.vue'),
  },
] as RouteRecordRaw[]
