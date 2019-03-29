<template>
  <v-container>
    <v-layout row wrap>
      <v-flex my-2 class="elevation-12" xs12 v-for="(cart,index) in carts" :key="index">
        <v-card>
          <v-layout>
            <v-flex xs3>
              <v-layout ml-2 fill-height align-center justify-content-center>
                <v-img :src="cart.product.image" aspect-ratio="2.75"></v-img>
              </v-layout>
            </v-flex>

            <v-flex xs5 fill-height>
              <v-layout>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 text-center">
                      <a @click="fetchProductDetail(cart.product._id)">
                        <b>{{cart.product.name}}</b>
                      </a>
                    </h3>

                    <span class="blue--text">Released {{beautyDate(cart.product.createdAt)}} </span>
                    <!-- <span class="black--text">| Item stock left : {{cart.product.stock}} </span> -->
                    <span class="black--text">| Item Price each {{beautyPrice(cart.product.price)}}</span>
                  </div>
                </v-card-title>
              </v-layout>
            </v-flex>
            <v-flex xs2>
              <v-layout fill-height align-center column>
                <div >
                  <v-card-text>Dibeli oleh : <b>{{cart.buyer.fullName}}</b></v-card-text>
                </div>
                <div >
                  <v-card-text>Sebanyak : {{cart.quantity}} buah </v-card-text>
                </div>
              </v-layout>
            </v-flex>
            <v-flex xs2>
              <v-layout fill-height align-center column>
                <div >
                  <v-card-text>Status pengiriman barang :</v-card-text>
                </div>
                <div v-if="cart.confirmation === true">
                    <v-card-text>Barang Telah Dikonfirmasi</v-card-text>
                </div>
                <div v-if="cart.confirmation === false">
                    <v-card-text>Barang Belum Dikonfirmasi</v-card-text>
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-card>
          <v-card-text>Total Transaction Seller</v-card-text>
          <v-card-text>
              Total Profit : {{beautyPrice(totalPrice(carts))}}
          </v-card-text>
          <v-card-text>
              Barang Yang Sudah Dikonfirmasi: {{totalReceived(carts)}}
          </v-card-text>
      </v-card>

    </v-layout>
  </v-container>
</template>

<script>

import swal from 'sweetalert'

export default {
  components: {
    // editform
  },
  name: 'AdminHistory',
  data () {
    return {
      // upvotes: 0,
      // downvotes: 0
      userId: localStorage.getItem('userId'),
      dialog: false

    }
  },
  methods: {
    confirmation (id) {
      this.$store.dispatch('confirmation', id)
    },
    totalReceived (carts) {
      let received = 0
      carts.forEach(cart => {
        if (cart.confirmation === true) received += 1
      })
      return received
    },
    totalPrice (carts) {
      let sum = 0
      carts.forEach(cart => {
        //   console.log('ini isi',cart.product.price)
        sum += (cart.product.price * cart.quantity) 
      })
      return sum
    },
    
    beautyPrice (price) {
      return `Rp. ${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    },
    beautyDate (date) {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    fetchProductDetail (id) {
      this.$store.dispatch('fetchProductDetail', id)
      this.redirectProduct(id)
      // kdfkdsksf
    },
    redirectProduct (id) {
      this.$router.push({ path: `/product/${id}` })
    },
    
  },
  computed: {
    carts () {
      return this.$store.state.adminCart
    }
  },
  created () {
    this.$store.dispatch('getAdminHistory')
  }
}
</script>
