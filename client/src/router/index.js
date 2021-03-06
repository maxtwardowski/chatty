import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../components/Chat.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Test from '../components/Test.vue'
import ConversationsList from '../components/ConversationsList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/chat/:convId',
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
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/conversations',
      name: 'Conversations',
      component: ConversationsList
    }
  ]
})
