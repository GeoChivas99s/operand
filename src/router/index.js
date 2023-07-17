import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/config/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "login" */ '../views/RegisterView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, fromRoute, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = auth.currentUser

  if (requiresAuth && !user) {
    next('/login')
  } else if (user && to.path === '/login') {
    next('/users')
  } else {
    next()
  }
})

export default router
