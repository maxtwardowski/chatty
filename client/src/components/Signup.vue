<template>
  <div>
    <form @submit="submitSignup">
      <p><input v-model="email" /></p>
      <p><input v-model="username" /></p>
      <p><input v-model="password" /></p>
      <p><input v-model="passwordConf" /></p>
      <button>Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      error: false
    }
  },
  methods: {
    submitSignup () {
      axios.post('http://localhost:3000/user', {
        email: this.email,
        username: this.username,
        password: this.password,
        passwordConf: this.passwordConf
      }).then(res => {
        console.log(res)
        this.error = true
      })
    }
  }
}
</script>
