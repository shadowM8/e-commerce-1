<template>
  <div class="title">
    <v-btn v-if="isLogin && isAdmin" class="primary elevation-12" :to="{ path: '/addProduct'}">Add new Product</v-btn>
    <v-btn class="primary elevation-12" :to="{ path: '/'}">All Product List</v-btn>
    <v-layout
        align-end
        fill-height
        pa-3
        blue--text
      >
        <div v-if="!isLogin" class="title font-weight-light" ><v-btn class="elevation-12" :to="{ path: '/auth/'}">Login</v-btn> first if you want to buy product</div>
      </v-layout>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    isAdmin() {
      return this.$store.state.isAdmin
    }
  }
}
</script>

<style>
</style>
