const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const {jwtSign} = require('../helpers/util')

chai.use(chaiHttp)

describe(`testing endpoint cart`, function () {
    before(function (done) {
        User.remove({}, () => {
            Product.remove({}, () => {
                Cart.remove({}, () => {
                    done()
                })
            })
        })
    })

    after(function (done) {
        User.remove({}, () => {
            Product.remove({}, () => {
                Cart.remove({}, () => {
                    done()
                })
            })
        })
    })

    let accessTokenSeller
    let accessTokenUser
    let userIdSeller
    let userIdUser
    let productId
    let productIdForDelete
    let cartId
    let cartId2
    //admin
    before(function (done) {
        let testUser = {
            fullName: `Mat Dolar`,
            email: `test02@mail.com`,
            password: `12345`,
            role: 'admin'
        }
        User.create(testUser)
            .then((user) => {
                let objUser = {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                }
                accessTokenSeller = jwtSign(objUser)
                userIdSeller = String(objUser.id)
                done()

            })
    })

    //product
    before(function(done){
        let newProduct = {
            name: `Honda City S 2019`,
            description: `Latest Product of Honda Company`,
            stock: 4,
            image: `Honda_city.jpg`,
            price: 250000,
            seller: userIdSeller
        }
        Product
            .create(newProduct)
            .then(product => {
                productId = product._id
                done()
            })
    })

    //user 
    before(function (done) {
        let testUser = {
            fullName: `Jeng Kelin`,
            email: `test04@mail.com`,
            password: `12345`,
            role: 'user'
        }
        User.create(testUser)
            .then((user) => {
                let objUser = {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                }
                accessTokenUser = jwtSign(objUser)
                userIdUser = String(objUser.id)
                done()

            })
    })

    describe(`POST /carts/ user (not seller) buy a product`, function(){
        describe(`POST /carts/ success case`, function(){
            it(`should send object that have status code 201 when buyer buy product `,function(done) {
                chai
                    .request(app)
                    .post(`/carts/`)
                    .set('access_token', accessTokenUser)
                    .send({
                        product: productId,
                        quantity: 2
                    })
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('product')
                        expect(res.body).to.have.property('buyer')
                        expect(res.body).to.have.property('quantity')
                        expect(res.body).to.have.property('checkOut')
                        expect(res.body).to.have.property('createdAt')
                        expect(res.body).to.have.property('updatedAt')
                        expect(res.body.product).to.equal(String(productId))
                        expect(res.body.quantity).to.equal(2)
                        expect(String(res.body.buyer)).to.equal(String(userIdUser))
                        expect(res.body.checkOut).to.equal(false)
                        done()
                    })

            })

            it(`should send object that have status code 201 when buyer buy product without inputing quantity`,function(done) {
                chai
                    .request(app)
                    .post(`/carts/`)
                    .set('access_token', accessTokenUser)
                    .send({
                        product: productId,
                    })
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('product')
                        expect(res.body).to.have.property('buyer')
                        expect(res.body).to.have.property('quantity')
                        expect(res.body).to.have.property('checkOut')
                        expect(res.body).to.have.property('createdAt')
                        expect(res.body).to.have.property('updatedAt')
                        expect(res.body.product).to.equal(String(productId))
                        expect(res.body.quantity).to.equal(1)
                        expect(String(res.body.buyer)).to.equal(String(userIdUser))
                        expect(res.body.checkOut).to.equal(false)
                        done()
                    })

            })
        })

        describe(`POST /carts/ failed case`, function(){
            it(`should send response with status 500 and message'product stock is not enough' when quantity exceeds stock`, function(done){
                chai
                    .request(app)
                    .post('/carts/')
                    .set('access_token',accessTokenUser)
                    .send({
                        product: productId,
                        quantity: 5
                    })
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal(`product stock is not enough`)
                        done()
                    })
            })

            it(`should send response with status 500 and message 'product not found' when product not input`, function(done){
                chai
                    .request(app)
                    .post('/carts/')
                    .set('access_token',accessTokenUser)
                    .send({
                        quantity: 5
                    })
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal(`product not found`)
                        done()
                    })
            })

            it(`should send response with status 500 and message 'unauthenticated user' when user id not exist`, function(done){
                chai
                    .request(app)
                    .post('/carts/')
                    // .set('access_token',accessTokenUser)
                    .send({
                        quantity: 1
                    })
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal(`unauthenticated user`)
                        done()
                    })
            })
        })
    })

    describe(`PATCH /carts/checkout user finalized their shopping item`, function(){
        describe(`PATCH /carts/ success case`, function(){
            it(`should send array that have status code 200 when user check out`, function(done) {
                chai
                    .request(app)
                    .patch('/carts')
                    .set('access_token', accessTokenUser)
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res.body).to.be.an('array')
                        expect(res.body.length).to.equal(2)
                        done()
                    })
            })
        })

        describe(`PATCH /carts/ failed case`, function(){
            it(`should send object that have status code 400 when user check out with 0 product`, function(done) {
                chai
                    .request(app)
                    .patch('/carts')
                    .set('access_token', accessTokenSeller)
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body.message).to.equal(`no product to checked!`)
                        done()
                    })
            })
        })
    })

    describe(`DELETE /carts/:cartId user remove product from carts`, function(){
        // create product for cart deletion
        before(function(done){
            let newProduct = {
                name: `Honda City S 2029`,
                description: `Latest Product of Honda Company`,
                stock: 4,
                image: `Honda_city.jpg`,
                price: 250000,
                seller: userIdSeller
            }
            Product
                .create(newProduct)
                .then(product => {
                    productIdForDelete = product._id
                    done()
                })
        })
        //user add product to cart for delete testing
        before(function(done){
            let productInCart = {
                product : productIdForDelete,
                buyer : userIdUser,
                quantity : 1
            }
            Cart
                .create(productInCart)
                .then(cart => {
                    cartId = cart._id
                    done()
                })
        })

        //another user add product
        before(function(done){
            let productInCart = {
                product : productIdForDelete,
                buyer : userIdSeller,
                quantity : 1
            }
            Cart
                .create(productInCart)
                .then(cart => {
                    cartId2 = cart._id
                    done()
                })
        })

        describe(`DELETE /carts/:cartId success case`, function(){
            
            it(`should send response as object with status code 200 when user delete product`, function(done){
                chai
                    .request(app)
                    .delete(`/carts/${cartId}`)
                    .set('access_token', accessTokenUser)
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body._id).to.equal(String(cartId))
                        done()
                    })
            })
        })
        
        describe(`DELETE /carts/:cartId failed case`, function(){
            it(`should send object with status code 401 and 'unauthorized access' when other than user delete cart`, function(done){
                chai
                    .request(app)
                    .delete(`/carts/${cartId2}`)
                    .set('access_token', accessTokenUser)
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('unauthorized access')
                        done()
                    })
            })

            it(`should send object with status code 400 and 'cart not found' when cart is not exist`, function(done){
                chai
                    .request(app)
                    .delete(`/carts/${cartId}`)
                    .set('access_token', accessTokenUser)
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('cart not found')
                        done()
                    })
            })
        })

    })
})