<template>
  <div>
    <button @click="getUsers">Kurwaa</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ConversationCreator',
  data () {
    return {
      users: []
    }
  },
  methods: {
    submitNewConversation () {

    },
    getUsers () {
      axios.get('http://localhost:3000/users/all', {
        withCredentials: true
      }).then(res => console.log(res))
    }
  }
}
</script>
