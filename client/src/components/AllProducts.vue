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

            <v-flex xs8 fill-height>
              <v-layout>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 text-center">
                      <a @click="fetchProductDetail(product._id)">
                        <b>{{product.name}}</b>
                      </a>
                    </h3>
                    <span class="grey--text">{{product.seller.fullName}} </span>
                    <span class="grey--text">| Released {{beautyDate(product.createdAt)}} </span>
                    <span class="black--text">| Stock left {{product.stock}}</span>
                  </div>
                </v-card-title>
              </v-layout>
            </v-flex>
            <v-flex xs1>
              <v-layout fill-height align-center>
                <div v-if="userId === product.seller._id">
                  <a @click="deleteProduct(product._id)">
                    <v-icon>delete</v-icon>
                  </a>
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import swal from 'sweetalert'
export default {
  components: {
    // editform
  },
  name: 'AllProducts',
  data () {
    return {
      // upvotes: 0,
      // downvotes: 0
      userId: localStorage.getItem('userId'),
      dialog: false
    }
  },
  methods: {
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
    deleteProduct (id) {
      swal({
        title: 'Warning',
        text: 'Are you sure you want to delete your product?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            swal('Poof! your product is gone!', {
              icon: 'success'
            })
            this.$store.dispatch('deleteProduct', id)
          } else {
            swal('Phew, that was close one')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }

}
</script>
