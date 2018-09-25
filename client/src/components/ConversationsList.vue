<template>
  <div>
    <conversation-creator></conversation-creator>
    <div>
      <input type="text" v-model="search" placeholder="Search existing conversations..." />
    </div>
    <p><b>My conversations:</b></p>
    <ul>
      <li v-for="(conversation, index) in filteredList" :key="index">
        <router-link :to="{
          name: 'Chat',
          params: {
            convId: conversation._id
          }
        }">
          {{ thumbnail(conversation.participants) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import ConversationCreator from './ConversationCreator'

export default {
  name: 'ConversationsList',
  data () {
    return {
      conversations: [],
      search: ''
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
  },
  computed: {
    filteredList () {
      return this.conversations.filter(conv => {
        return this.thumbnail(conv.participants).toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  components: {
    ConversationCreator
  }
}
</script>
