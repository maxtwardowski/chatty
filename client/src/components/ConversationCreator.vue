<template>
  <div>
    <p><button @click="toggleExtend"><b>Create new conversation</b></button></p>
    <div v-show="extended">
      <div>
        <input type="text" v-model="search" placeholder="Search users..." />
      </div>
      <div v-show="newConvParticipants.length > 0">
        <p><b>New conversation:</b></p>
        <ul>
          <li v-for="(user, index) in newConvParticipants" :key="index">
            {{ user.username }}
          </li>
        </ul>
        <button @click="submitNewConversation">Create conversation</button>
      </div>
      <div v-show="users.length > 0">
        <p><b>Users:</b></p>
        <ul>
          <li v-for="(user, index) in filteredUsers" :key="index" @click="pickUser(user)">
            {{ user.username }}
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ConversationCreator',
  data () {
    return {
      extended: false,
      users: [],
      newConvParticipants: [],
      search: ''
    }
  },
  created () {
    axios.get('http://localhost:3000/users/all', {
      withCredentials: true
    }).then(res => {
      this.users = res.data.users
    })
      .catch(err => console.log(err))
  },
  methods: {
    submitNewConversation () {
      this.newConvParticipants.push(this.$store.state.user)
      axios.post('http://localhost:3000/chat/conv/new',
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
    pickUser (user) {
      var index = this.users.indexOf(user)
      this.users.splice(index, 1)
      this.newConvParticipants.push(user)
    },
    toggleExtend () {
      this.extended = !this.extended
    }
  },
  computed: {
    filteredUsers () {
      return this.users.filter(user => {
        return user.username.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>
