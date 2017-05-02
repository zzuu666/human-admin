import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SignIn from '@/components/sign-in'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Hello
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
