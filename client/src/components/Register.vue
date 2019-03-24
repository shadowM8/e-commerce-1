<template>
    <v-layout align-center justify-center>
      <v-flex xs7>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <form v-on:submit.prevent="registerNow">
            <v-text-field prepend-icon="create" label="Email" type="text" v-model="email"></v-text-field>
            <v-text-field prepend-icon="tag_faces" label="Full Name" type="text" v-model="fullName"></v-text-field>
            <v-text-field prepend-icon="person_pin" label="Role" type="text" v-model="role"></v-text-field>
            <v-text-field prepend-icon="not_listed_location" label="Password" type="password" v-model="password"></v-text-field>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
// import router from '@/router.js'
export default {
    data: function() {
    return {
      email: "",
      fullName : "",
      role : "",
      password: "",
    };
  },
  methods: {
    registerNow() {
      let dePayLoad = {
        email: this.email,
        fullName: this.fullName,
        role : this.role,
        password : this.password
      };
      this.$store.dispatch("register", dePayLoad);
      this.redirect()
    },
    redirect () {
        this.$router.push({ path: "/" })
    }
  }
}
</script>

<style>

</style>
