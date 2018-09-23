<template>
  <div>
    <h2>Login</h2>
    <p v-show="error" style="color: red">Wrong email and/or password!</p>
    <form @submit="submitLogin">
      <p><input v-model="email" type="text" placeholder="Email" /></p>
      <p><input v-model="password" type="password" placeholder="Password" /></p>
      <button>Sign in</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    submitLogin () {
      axios.post('http://localhost:3000/login',
        {
          'email': this.email,
          'password': this.password
        },
        {
          withCredentials: true
        }
      ).then(res => {
        this.$store.dispatch('fetchUser')
        this.$router.push('/')
      }).catch(err => {
        this.error = err
      })
      this.email = ''
      this.password = ''
    }
  }
}
</script>
