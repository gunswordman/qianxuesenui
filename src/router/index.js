import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import outcome from '../components/teacher/outcome.vue'
import stuwelcome from '../components/student/stuwelcome.vue'
import teawelcome from '../components/teacher/teawelcome.vue'
import stuhome from '../components/student/stuhome.vue'
import xuanke from '../components/student/xuanke.vue'
import stupw from '../components/student/stupw.vue'
import teahome from '../components/teacher/teahome.vue'
import details from '../components/teacher/details.vue'
import teapw from '../components/teacher/teapw.vue'
import alladvice from '../components/teacher/alladvice.vue'
import preview from '../components/teacher/preview.vue'
import prepoint from '../components/teacher/prepoint.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/stuhome',
    component: stuhome,
    redirect: '/stuwelcome',
    children: [
      { path: '/stuwelcome', component: stuwelcome },
      { path: '/xuanke', component: xuanke },
      { path: '/stupw', component: stupw }
    ]
  },
  {
    path: '/teahome',
    component: teahome,
    redirect: '/teawelcome',
    children: [
      { path: '/teawelcome', component: teawelcome },
      { path: '/outcome', component: outcome },
      { path: '/details', component: details },
      { path: '/alladvice', component: alladvice },
      { path: '/preview', component: preview },
      { path: '/prepoint', component: prepoint, name: 'prepoint' },
      { path: '/teapw', component: teapw }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const username = window.sessionStorage.getItem('role')
  if (!username) return next('/login')
  next()
})

export default router
