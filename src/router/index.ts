import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/todo_list',
    name: 'TodoView',
    component: () => import('@/views/TodoView.vue'),
  },
  {
    path: '/todo_list/:id',
    name: 'TodoDetail',
    component: () => import('@/views/TodoDetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
