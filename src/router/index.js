import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
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
})

export default router