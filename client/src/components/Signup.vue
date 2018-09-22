<template>
  <div>
    <h2>Signup</h2>
    <p v-show="passwordsMatchError">Passwords don't match!</p>
    <form @submit="submitSignup">
      <p><input v-model="email" type="text" placeholder="Email" /></p>
      <p><input v-model="username" type="text" placeholder="Username" /></p>
      <p><input v-model="password" type="password" placeholder="Password" /></p>
      <p><input v-model="passwordConf" type="password" placeholder="Confirm Password" /></p>
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
      passwordsMatchError: false
    }
  },
  methods: {
    submitSignup () {
      if (this.password !== this.passwordConf) {
        this.passwordsMatchError = true
      } else {
        axios.post('http://localhost:3000/users', {
          email: this.email,
          username: this.username,
          password: this.password,
          passwordConf: this.passwordConf
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>
