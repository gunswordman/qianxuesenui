import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import outcome from '../components/teacher/outcome.vue'
import stuwelcome from '../components/student/stuwelcome.vue'
import teawelcome from '../components/teacher/teawelcome.vue'
import stuhome from '../components/student/stuhome.vue'
import xuanke from '../components/student/xuanke.vue'
import teahome from '../components/teacher/teahome.vue'

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
      { path: '/xuanke', component: xuanke }
    ]
  },
  {
    path: '/teahome',
    component: teahome,
    redirect: '/teawelcome',
    children: [
      { path: '/teawelcome', component: teawelcome },
      { path: '/outcome', component: outcome }
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