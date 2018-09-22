<template>
  <div>
    <button @click="checkUnprotected">Unprotected</button>
    <button @click="checkProtected">Protected</button>
  </div>
</template>

<script>
import axios from 'axios'

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
    }
  }
}
</script>
