import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '',
    name: 'TheDashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
  },
  {
    path: '/settings',
    name: 'TheSettings',
    component: () => import('@/views/setting/Setting.vue'),
  },
] as RouteRecordRaw[]
