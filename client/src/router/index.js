import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../components/Chat.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import AuthChecker from '../components/AuthChecker.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/check',
      name: 'AuthChecker',
      component: AuthChecker
    }
  ]
})
