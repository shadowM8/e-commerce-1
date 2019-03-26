<template>
  <v-container>
    <v-layout row wrap>
      <v-flex my-2 class="elevation-12" xs12 v-for="(product,index) in products" :key="index">
        <v-card>
          <v-layout>
            <v-flex xs3>
              <v-layout ml-2 fill-height align-center justify-content-center>
                <v-img :src="product.image" aspect-ratio="2.75"></v-img>
              </v-layout>
            </v-flex>

            <v-flex xs7 fill-height>
              <v-layout>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 text-center">
                      <a @click="fetchProductDetail(product._id)">
                        <b>{{product.name}}</b>
                      </a>
                    </h3>

                    <span class="blue--text">Released {{beautyDate(product.createdAt)}} </span>
                    <span class="black--text">| Item stock left : {{product.stock}} </span>
                    <span class="black--text">| Item Price each {{beautyPrice(product.price)}}</span>
                  </div>
                </v-card-title>
              </v-layout>
            </v-flex>
            <v-flex xs2>
              <!-- <v-layout fill-height align-center column>
                <div v-if="cart.confirmation === false">
                  <v-card-text>Apakah barang sudah sampai?</v-card-text>
                  <v-btn>
                  <a @click="confirmation(cart._id)">
                    <v-icon>done</v-icon>
                  </a>
                  </v-btn>
                </div>
                <div v-if="cart.confirmation === true">
                    <v-card-text>Barang Telah Sampai, terimakasih</v-card-text>
                </div>
              </v-layout> -->
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-card>
          <v-card-text>Total Transaction User</v-card-text>
          <v-card-text>
              Total Product Price: {{beautyPrice(totalPrice(products))}}
          </v-card-text>
          <v-card-text>
              Barang Yang Telah Diterima: {{totalReceived(products)}}
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
        sum += (cart.price)
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
    products () {
      return this.$store.state.adminProduct
    }
  },
  created () {
    this.$store.dispatch('getAdminHistory')
  }
}
</script>
