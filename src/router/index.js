import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'
import PageTwo from '@/components/PageTwo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
        path: '/',
        name: 'SignIn',
        component: SignIn
    },
    {
      path: '/pageTwo',
      name: 'pageTwo',
      component: PageTwo
    }
  ]
})