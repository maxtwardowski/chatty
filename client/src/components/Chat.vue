<template>
  <div>
    <div v-for="(msg, index) in messages" :key="index">
      <p><b>{{ msg.username }}</b>: {{ msg.message }}</p>
    </div>
    <form @submit="sendMessage">
      <input type="text" v-model="message" autocomplete="off" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Chat',
  data () {
    return {
      message: '',
      messages: [],
      participants: [],
      socket: io('localhost:3000'),
      conversationId: this.$route.params.convId
    }
  },
  methods: {
    sendMessage (e) {
      e.preventDefault()
      axios.post(`http://localhost:3000/chat/${this.conversationId}`,
        {
          'messageContent': this.message
        },
        {
          withCredentials: true
        }
      ).then(() => {
        this.socket.emit('SEND_MESSAGE', {
          conversationId: this.conversationId,
          username: this.username,
          message: this.message
        })
        this.message = ''
      })
    }
  },
  mounted () {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data]
    })
  },
  created () {
    axios.get(`http://localhost:3000/chat/${this.conversationId}`, {
      withCredentials: true
    }).then(res => {
      console.log(res)
      var oldMessages = res.data.msgList
      oldMessages.forEach(msg => {
        this.messages.push(msg)
      })
    })
    this.socket.emit('SUBSCRIBE', this.conversationId)
  },
  computed: mapState({
    username: state => state.user.username
  })
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font: 13px Helvetica, Arial;
}
form {
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
form input {
  border: 0;
  padding: 10px;
  width: 90%;
  margin-right: 0.5%;
}
form button {
  width: 9%;
  background: rgb(0, 119, 255);
  border: none;
  padding: 10px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#messages li {
  padding: 5px 10px;
}
#messages li:nth-child(odd) {
  background: #eee;
}
</style>
