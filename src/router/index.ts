import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginUsuarioView from '../views/BomberoLoginView.vue'
import BomberoPanelView from '../views/BomberoPanelView.vue'
import AdminPanelView from '../views/AdminPanelView.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login-usuario',
    name: 'login-usuario',
    component: LoginUsuarioView,
  },
  {
    path: '/panel-bombero',
    name: 'panel-bombero',
    component: BomberoPanelView,
    meta: { requiresAuth: true, role: 'bombero' },
  },
  {
    path: '/panel-admin',
    name: 'panel-admin',
    component: AdminPanelView,
    meta: { requiresAuth: true, role: 'admin' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    const parsed = JSON.parse(storedUser)
    if (!auth.user || auth.user.username !== parsed.username || auth.user.role !== parsed.role) {
      auth.user = parsed
    }
  } else {
    auth.user = null
  }
  if (to.meta.requiresAuth) {
    if (!auth.isAuthenticated) {
      return next({ name: 'login-usuario' })
    } else if (to.meta.role && auth.user?.role !== to.meta.role) {
      return next({ name: 'home' })
    }
  }
  next()
})

export default router
