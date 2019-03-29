<template>
  <v-app>
    <v-navigation-drawer app fixed clipped width="190">
      <v-list>
        <div v-if="!isAdmin">
        <v-list-tile v-for="(i,index) in 4" :to="{path: page[i-1]}" :key="index">
          <v-list-tile-action>
            <v-icon>{{ icons[i-1] }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ title[i-1]  }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </div>
        <div v-if="isAdmin">
        <v-list-tile  v-for="(i,index) in 3" :to="{path: adminpage[i-1]}" :key="index">
          <v-list-tile-action>
            <v-icon>{{ adminicons[i-1] }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ admintitle[i-1]  }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </div>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>verified_user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <div v-if="isAdmin">
              ADMIN {{user}}
            </div>
            <div v-if="!isAdmin">
            USER {{user}}
            </div>
          </v-list-tile-content>
        </v-list-tile>
        

      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title class="headline text-uppercase">
        <span>Shopping</span>
        <span class="font-weight-light"> E-Commerce</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :nudge-width="-100">
        <v-toolbar-title slot="activator">
          Toolbar
        </v-toolbar-title>
        <v-list>
          <v-list-tile :to="'/auth'">
            Auth
          </v-list-tile>
          <v-list-tile :to="'/carts'">
            <v-list-tile-title >Cart</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data () {
    return {
      icons: ['dashboard', 'home', 'shopping_cart', 'history'],
      title: ['LOGIN', 'HOME', 'CART', 'HISTORY'],
      page: ['/auth', '/', '/carts', '/history'],
      adminicons: ['dashboard','home','history'],
      admintitle: ['LOGIN','HOME','ADMIN'],
      adminpage: ['/auth','/','/admin']

    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('mutateIsLogin', true)
      this.$store.commit('mutateUserName', localStorage.userName)
    }
    this.$store.dispatch('getAllProducts')
    if (localStorage.getItem('admin')) {
      this.$store.commit('mutateIsAdmin', true)
    }
  },
  computed: {
    user () {
      return this.$store.state.username
    },
    isAdmin () {
      return this.$store.state.isAdmin
    }
  }
}
</script>
