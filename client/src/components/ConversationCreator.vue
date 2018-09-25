<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ConversationCreator',
  data () {
    return {
      users: [],
      newConvParticipants: []
    }
  },
  methods: {
    submitNewConversation () {
      axios.post('http://localhost:3000/chat/new',
        {
          convParticipants: this.newConvParticipants
        },
        {
          withCredentials: true
        }
      ).then(res => {
        this.$router.push(`/chat/${res.data.convId}`)
      }).catch(err => console.log(err))
    },
    getUsers () {
      axios.get('http://localhost:3000/users/all', {
        withCredentials: true
      }).then(res => {
        this.users = res.data.users
      })
        .catch(err => console.log(err))
    }
  }
}
</script>
