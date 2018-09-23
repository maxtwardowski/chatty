<template>
  <div>
    <router-link to="/">Chat</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Sign Up</router-link>
    <router-link to="/check">Checker</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
* {
  margin-bottom: 30px;
}
</style>
