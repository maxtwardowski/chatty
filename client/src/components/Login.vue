<template>
  <div>
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
      password: ''
    }
  },
  methods: {
    submitLogin () {
      axios.post('http://localhost:3000/showmedat', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
