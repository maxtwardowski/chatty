import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../components/Chat.vue'
import Login from '../components/Login.vue'

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
    }
  ]
})
