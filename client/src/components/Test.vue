<template>
  <div>
    <button @click="getConversations">Get conversations</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Test',
  methods: {
    getConversations () {
      axios.get('http://localhost:3000/chat', {
        withCredentials: true
      }).then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
}
</script>
