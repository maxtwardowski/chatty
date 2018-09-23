<template>
  <div id="app">
    <h1>Chatty</h1>
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: mapState({
    user: state => state.user
  }),
  created () {
    if (this.user) this.$store.dispatch('fetchUser')
  }
}
</script>

<style>
* {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
