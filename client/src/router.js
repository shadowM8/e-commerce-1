import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AuthPage from './views/Auth.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import AllProducts from './components/AllProducts.vue'
import AddProduct from './components/AddProduct.vue'
import ProductDetail from './components/ProductDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'AllProducts',
          component: AllProducts
        },
        {
          path: '/addProduct',
          component: AddProduct
        },
        {
          path: '/product/:id',
          component: ProductDetail
        }
      ]
    },
    {
      path: '/auth',
      // name: 'AuthPage',
      component: AuthPage,
      children : [
        {
          path: '/',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        }
      ],
      
    },
    // {
    //   path: '/about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
