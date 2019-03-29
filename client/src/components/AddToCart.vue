<template>
    <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Add To Cart Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div align-content-justify>{{ product.name }}</div>
            <div align-content-justify>Price : {{ product.price }}</div>
            <div align-content-justify>Stock : {{ product.stock }}</div>
            <v-alert v-if="product.stock === 0"
            :value="true"
            type="error">
            {{product.name}} is sold out !
            </v-alert>
            <form v-if="product.stock > 0" v-on:submit.prevent="addProductToCart">
              <v-text-field type="number" prepend-icon="local_atm" label="product quantity" v-model="quantity"></v-text-field>
              <!-- <input @change="fileUpload" type="file" class="form-control" id="file"> -->
              <v-btn type="submit" color="primary">Submit</v-btn>
            </form>
            <!-- <v-btn color="primary" flat @click="closeDialog">I accept</v-btn> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      userId: localStorage.getItem('userId'),
      quantity: 1
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closedialog', false)
    },
    addProductToCart () {
      let dataCart = {
        product: this.product._id,
        quantity: this.quantity,
        buyer: this.userId
      }
      this.$emit('closedialog', false)
      this.$store.dispatch('addProductToCart', dataCart)
    }
  },
  computed: {
    product () {
      return this.$store.state.productDetail
    }
  }
}
</script>

<style>

</style>
