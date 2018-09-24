<template>
  <div v-if="user">
    <p>Logged in as {{ user.username }}</p>
    <router-link to="/">Chat</router-link>
    <router-link to="/conversations">Conversations</router-link>
    <router-link to="/logout">Logout</router-link>
  </div>
  <div v-else>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Sign Up</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  computed: mapState({
    user: state => state.user
  })
}
</script>

<style scoped>
* {
  margin-bottom: 30px;
}
</style>
