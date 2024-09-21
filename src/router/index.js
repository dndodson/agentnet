import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ControlPanel from '../views/ControlPanel.vue'
import { supabase } from '../lib/supabase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/control-panel',
    name: 'ControlPanel',
    component: ControlPanel,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()

  if (to.path === '/' && session) {
    next('/control-panel')
  } else if (to.matched.some(record => record.meta.requiresAuth) && !session) {
    next('/login')
  } else {
    next()
  }
})

export default router