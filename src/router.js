import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { // Удалить
    path: '/testDelite',
    name: 'testDelite',
    meta: { layout: 'empty' },
    component: () => import('./views/TestDelite.vue')
  },
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
    path: '/',
    name: 'tests',
    meta: { layout: 'main' },
    component: () => import('./views/Tests.vue')
  },
  {
    path: '/create_test',
    name: 'create_test',
    meta: { layout: 'main' },
    component: () => import('./views/CreateTest.vue')
  },
  {
    path: '/modify_test',
    name: 'modify_test',
    meta: { layout: 'main' },
    component: () => import('./views/ModifyTest.vue')
  },
  {
    path: '/results_test',
    name: 'results_test',
    meta: { layout: 'main' },
    component: () => import('./views/ResultsTest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
