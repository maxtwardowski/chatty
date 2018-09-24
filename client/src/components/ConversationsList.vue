<template>
  <div>
    <div v-for="(conversation, index) in conversations" :key="index">
      <router-link :to="{
        name: 'Chat',
        params: {
          convId: conversation._id
        }
      }">
        {{ thumbnail(conversation.participants) }}
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ConversationsList',
  data () {
    return {
      conversations: []
    }
  },
  created () {
    axios.get('http://localhost:3000/chat', {
      withCredentials: true
    }).then(res => {
      this.conversations = res.data.conversations
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    thumbnail (participants) {
      var str = ''
      participants.forEach(element => {
        str += ' '
        str += element.username
      })
      return str
    },
    goToConversation () {
      this.$router.push('/chat')
    }
  }
}
</script>
