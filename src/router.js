import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('./views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('./views/Register.vue')
  },
  {
    path: '/decision/:id',
    name: 'decision',
    meta: { layout: 'empty' },
    component: () => import('./views/DecisionTest.vue')
  },
  {
    path: '/result',
    name: 'result',
    meta: { layout: 'empty' },
    component: () => import('./views/Result.vue')
  },
  {
    path: '/',
    name: 'tests',
    meta: { layout: 'main', auth: true },
    component: () => import('./views/Tests.vue')
  },
  {
    path: '/create-test',
    name: 'create-test',
    meta: { layout: 'main', auth: true },
    component: () => import('./views/CreateTest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = sessionStorage.getItem('token')
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
