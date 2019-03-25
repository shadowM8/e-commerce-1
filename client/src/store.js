import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    history: [],
    username: 'username',
    isAdmin: false,
    isLogin: false,
    productDetail: {
      name: '',
      description: '',
      image: '',
      stock: '',
      price: '',
      seller: {
        fullName: ''
      }
    }
  },
  mutations: {
    mutateIsLogin(state, payload) {
      state.isLogin = payload
    },
    mutateUserName(state, payload) {
      state.username = payload
    },
    initialProducts(state, payload) {
      state.products = payload
    },
    mutateProducts(state, payload) {
      state.products.unshift(payload)
    },
    mutateProductDetail(state, payload) {
      state.productDetail = payload
    },
    initialCarts(state, payload) {
      state.carts = payload
    },
    mutateCarts(state, payload) {
      state.carts.push(payload)
    },
    initialHistory(state, payload) {
      state.history = payload
    },
    mutateIsAdmin(state, payload) {
      state.isAdmin = payload
    }

  },
  actions: {
    login(context, payload) {
      axios
        .post('/users/login', payload)
        .then(({ data }) => {
          if(data.role === 'admin'){
            localStorage.setItem('admin', data.role)
            context.commit('mutateIsAdmin', true)
          }
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('userName', data.fullName)
          context.commit('mutateUserName', data.fullName)
          context.commit('mutateIsLogin', true)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout(context) {
      swal({
        title: 'Warning',
        text: 'Are you sure you want to log out?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willLogout) => {
          if (willLogout) {
            swal("Bye! See you again!", {
              icon: "success",
            })
            context.commit('mutateIsLogin', false)
            context.commit('mutateUserName', null)
            context.commit('mutateIsAdmin', false)
            localStorage.clear()
          }
          else {
            swal("Enjoy your time in e - commerce");
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllProducts(context) {
      axios
        .get('/products')
        .then(({ data }) => {
          console.log(data)
          context.commit('initialProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register(context, payload) {
      // this.$router.push({ path: "Login" })
      axios
        .post('/users/', payload)
        .then(({ data }) => {
          console.log(data)
          swal({
            title: 'Congratulations!',
            text: 'Your account has been created, please go to login page to log in',
            icon: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct(context, payloadId) {
      axios({
        method: 'delete',
        url: `/products/${payloadId}`,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('deleted', data.name)
          context.dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct(context, payloadData) {
      axios({
        method: 'post',
        url: `/products/`,
        headers: {
          access_token: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        },
        data: payloadData
      })
        .then(({ data }) => {
          swal({
            title: 'congratulations',
            text: 'your product has been posted',
            icon: 'success'
          })
          context.commit('mutateProducts', data)
          context.dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductDetail(context, payloadId) {
      axios({
        method: 'get',
        url: `/products/${payloadId}`,
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('mutateProductDetail', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct(context, payload) {
      console.log(payload)
      axios({
        method: 'put',
        url: `/products/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('token'),
        },
        data: payload.data
      })
        .then(({data}) => {
          console.log('sukses edit data',data)
          context.dispatch('fetchProductDetail', data._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct(context, payload) {
      axios({
        method: 'delete',
        url: `/products/${payload}`,
        headers: {
          access_token: localStorage.getItem('token'),
        }
      })
        .then(({data}) => {
          console.log(`sukses delete data`,data)
          context.dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProductToCart(context,payload){
      axios({
        method: 'post',
        url: `/carts/`,
        headers: {
          access_token: localStorage.getItem('token'),
        },
        data: payload
      })
        .then(({data}) => {
          context.commit('mutateCarts', data)
          context.dispatch('getAllCarts')
        })
    },
    getAllCarts(context) {
      axios({
        method: 'get',
        url: `/carts/`,
        headers: {
          access_token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          console.log(data)
          let cartsProduct = []
          let historyProduct = []
          data.forEach(cart => {
            if(cart.checkOut) {
              historyProduct.push(cart)
            }
            else {
              cartsProduct.push(cart)
            }
          })
          context.commit('initialCarts', cartsProduct)
          context.commit('initialHistory', historyProduct)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart(context,payload){
      axios({
        method: 'delete',
        url: `/carts/${payload}`,
        headers: {
          access_token: localStorage.getItem('token'),
        },
      })
        .then(({data}) => {
          console.log(`deleted cart data: ${data}`)
          context.dispatch('getAllCarts')
          context.dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkOut(context){
      axios({
        method: 'patch',
        url: `/carts/`,
        headers: {
          access_token: localStorage.getItem('token'),
        }
      })
        .then(({data}) => {
          context.dispatch('getAllCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirmation(context,payload) {
      axios({
        method: 'patch',
        url: `/carts/${payload}`,
        headers: {
          access_token: localStorage.getItem('token'),
        }
      })
        .then(({data}) => {
          context.dispatch('getAllCarts')
        })
        .catch(err => {
          console.log(err)
        })
    }



  }
})
