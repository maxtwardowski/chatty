<template>
  <div>
    <button @click="checkUnprotected">Unprotected</button>
    <button @click="checkProtected">Protected</button>
    <button @click="changeMessage">Change message!</button>
    <button @click="getUser">Get user</button>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AuthChecker',
  methods: {
    checkUnprotected (e) {
      e.preventDefault()
      axios.get('http://localhost:3000/unprotected', {
        withCredentials: true
      })
        .then(res => console.log(res))
    },
    checkProtected (e) {
      e.preventDefault()
      axios.get('http://localhost:3000/protected', {
        withCredentials: true
      })
        .then(res => console.log(res))
    },
    ...mapActions([
      'changeMessage'
    ]),
    getUser (e) {
      e.preventDefault()
      axios.get('http://localhost:3000/users', {
        withCredentials: true
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  },
  computed: mapState({
    message: state => state.message
  })
}
</script>
