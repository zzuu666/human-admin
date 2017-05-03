import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import SignIn from '@/components/sign-in'
import Profile from '@/components/home/profile'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/profile',
      component: Home,
      children: [
        {
          path: 'profile',
          component: Profile
        }
      ]
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    }
  ]
})

export default router
