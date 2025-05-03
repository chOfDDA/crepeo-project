import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/features/auth/authRoutes'

const routes = [
  ...authRoutes,
  // ... другие маршруты
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router