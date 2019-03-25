<template>
  <v-container>
    <v-layout row wrap>
      <v-flex my-2 class="elevation-12" xs12>
        <v-card>
          <v-layout mx-2>
            <v-flex>
              <v-layout fill-height align-center justify-content-center row wrap>
                <v-btn>
                  <v-icon>expand_less</v-icon>
                </v-btn>

                <v-btn>
                  <v-icon>expand_more</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    <b>{{product.name}}</b>
                  </h3>
                  <span class="grey--text">{{product.seller.fullName}} </span>
                  <span class="black--text"> | {{beautyDate(product.createdAt)}}</span>
                </div>
              </v-card-title>
              <v-img :src="product.image" aspect-ratio="2.75"></v-img>
              <v-card-text>
                <div align-content-justify>{{ product.description }}</div>
                <div align-content-justify>Price : {{ product.price }}</div>
                <div align-content-justify>Stock : {{ product.stock }}</div>
              </v-card-text>
              <v-card-actions v-if="userId === product.seller._id">
                <v-dialog v-model="dialog">
                  <v-btn slot="activator" flat color="warning">Edit Product</v-btn>
                  <EditProduct @closedialog="closeDialog"/>
                </v-dialog>
              </v-card-actions>
              <v-card-actions v-if="userId !== product.seller._id">
                <v-dialog v-model="dialog">
                  <v-btn slot="activator" flat color="success"><v-icon>shopping_cart</v-icon> Add Product To Cart</v-btn>
                  <AddToCart @closedialog="closeDialog"/>
                </v-dialog>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
        <!-- comment form -->
        <!-- <v-card>
          <v-layout>
            <v-flex>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Your Answer</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <form v-on:submit.prevent="addAnswer">
                <v-text-field
                  prepend-icon="create"
                  label="Answer Title"
                  type="text"
                  v-model="title"
                ></v-text-field>
                <v-textarea
                  v-model="description"
                  prepend-icon="not_listed_location"
                  label="Your Answer here"
                  rows="2"
                ></v-textarea>
                <v-btn type="submit" color="primary">Submit</v-btn>
              </form>
            </v-flex>
          </v-layout>
        </v-card>-->
      </v-flex>
    </v-layout>
    <!-- comment component -->
    <!-- <answers/> -->
  </v-container>
</template>

<script>
// import answers from "@/components/answer";
import EditProduct from "@/components/EditProduct";
import AddToCart from "@/components/AddToCart"
import swal from "sweetalert";
export default {
  components: {
    EditProduct,
    AddToCart
  },
  computed:
    {
      product() {
        return this.$store.state.productDetail;
      }
    },
  created() {
    this.$store.dispatch("fetchProductDetail", this.$route.params.id);
  },
  data() {
    return {
      dialog: false,
      userId: localStorage.getItem("userId")
      //   upvoteColor: "blue",
      //   downvoteColor: "blue",
      //   disabled: "false"
    };
  },
  methods: {
    closeDialog(event) {
      this.dialog = event;
    },
    beautyDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    // addAnswer() {
    //   let dePayload = {
    //     title: this.title,
    //     description: this.description,
    //     questionId: this.$route.params.id
    //   };
    //   this.$store.dispatch("addAnswer", dePayload);
    //   this.title = "";
    //   this.description = "";
    // },
    // upVoteThisQuestion(question) {
    //   let userId = localStorage.id;
    //   if (userId === question.createdBy._id) {
    //     swal({
    //       title: "Warning",
    //       text: "you cant upvote your own question!",
    //       icon: "error"
    //     });
    //   } else {
    //     if (question.upvotes.indexOf(userId) === -1) {
    //       console.log(`upvote this ${question._id}`);
    //       this.$store.dispatch("upVoteNow", question._id);
    //       this.upvoteColor = "red";
    //     } else {
    //       console.log(`user ${userId} already upvote, so will cancel upvote`);
    //       this.$store.dispatch("removeUpvote", question._id);
    //       this.upvoteColor = "blue";
    //     }
    //   }
    // },
    // downVoteThisQuestion(question) {
    //   let userId = localStorage.id;
    //   if (userId === question.createdBy._id) {
    //     swal({
    //       title: "Warning",
    //       text: "you cant downvote your own question!",
    //       icon: "error"
    //     });
    //   } else {
    //     if (question.downvotes.indexOf(userId) === -1) {
    //       console.log(`upvote this ${question._id}`);
    //       this.$store.dispatch("downVoteNow", question._id);
    //       this.downvoteColor = "red";
    //     } else {
    //       console.log(
    //         `user ${userId} already downvote, so will cancel downvote`
    //       );
    //       this.$store.dispatch("removeDownvote", question._id);
    //       this.downvoteColor = "blue";
    //     }
    //   }
    // }
  }
};
</script>

