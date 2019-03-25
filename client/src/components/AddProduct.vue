<template>
  <v-layout align-center justify-center>
    <v-flex xs9>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add New Product</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <form v-on:submit.prevent="addProduct">
            <v-text-field prepend-icon="create" label="product name" type="text" v-model="name"></v-text-field>
            <v-text-field
              prepend-icon="tag_faces"
              label="description"
              type="text"
              v-model="description"
            ></v-text-field>
            <v-text-field prepend-icon="local_atm" label="product price" v-model="price"></v-text-field>
            <v-text-field prepend-icon="local_atm" label="product stock" v-model="stock"></v-text-field>
            <input @change="fileUpload" type="file" class="form-control" id="file">
            <v-btn type="submit" color="primary">Submit</v-btn>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import VueFroala from "vue-froala-wysiwyg";
export default {
  data: function () {
    return {
      name: '',
      description: '',
      price: '',
      stock: '',
      image: ''
    }
  },
  methods: {
    fileUpload (e) {
      this.image = e.target.files[0]
    },
    addProduct () {
      let dataProduct = new FormData()
      dataProduct.append('image', this.image)
      dataProduct.append('name', this.name)
      dataProduct.append('description', this.description)
      dataProduct.append('price', this.price)
      dataProduct.append('stock', this.stock)
      this.$store.dispatch('addProduct', dataProduct)
      this.redirect()
    },
    redirect () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
</style>
