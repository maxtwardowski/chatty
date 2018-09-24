<template>
  <div>
    <div v-for="(conversation, index) in conversations" :key="index">

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
    }).err(err => {
      console.log(err)
    })
  }
}
</script>
