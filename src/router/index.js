import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import SignIn from '@/components/sign-in'
import Salary from '@/components/home/salary'
import Profile from '@/components/home/profile'
import Asset from '@/components/home/asset'
import VacationApply from '@/components/home/vacation/apply'
import VacationHistory from '@/components/home/vacation/history'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/user',
      name: 'index',
      component: Home,
      children: [
        {
          path: 'profile',
          component: Profile
        },
        {
          path: 'salary',
          component: Salary
        },
        {
          path: 'asset',
          component: Asset
        },
        {
          path: 'apply',
          component: VacationApply
        },
        {
          path: 'history',
          component: VacationHistory
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
