<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Edit Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form v-on:submit.prevent="editProduct">
              <v-text-field
                prepend-icon="create"
                label="product title"
                type="text"
                v-model="product.name"
              ></v-text-field>
              <v-textarea
                prepend-icon="tag_faces"
                label="description"
                type="text"
                v-model="product.description"
              ></v-textarea>
              <v-text-field prepend-icon="local_atm" label="product price" v-model="product.price"></v-text-field>
              <v-text-field prepend-icon="local_atm" label="product stock" v-model="product.stock"></v-text-field>
              <input @change="fileUpload" type="file" class="form-control" id="file">
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
  data() {
    return {
      userId: localStorage.getItem("userId")
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closedialog", false);
    },
    fileUpload(e) {
      this.product.image = e.target.files[0];
    },
    editProduct() {
      // let dataProduct = new FormData();
      // dataProduct.append("image", this.product.image);
      // dataProduct.append("name", this.product.name);
      // dataProduct.append("description", this.product.description);
      // dataProduct.append("price", this.product.price);
      // dataProduct.append("stock", this.product.stock);
      // console.log('ini dataProduct',dataProduct)
      let dataProduct = {
        name : this.product.name,
        description : this.product.description,
        price : this.product.price,
        stock : this.product.stock,
      }
      let dePayload = {
        data: dataProduct,
        id: this.product._id
      };
      this.$emit("closedialog", false);
      this.$store.dispatch("editProduct", dePayload);
    }
  },
  computed: {
    product() {
      return this.$store.state.productDetail;
    }
  }
};
</script>
