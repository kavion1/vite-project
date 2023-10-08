import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/transaction_record',
    name: 'transactionRecord',
    component: () => import('../views/Transaction/transactionRecord.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
