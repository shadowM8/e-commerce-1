const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const { jwtSign } = require('../helpers/util')



chai.use(chaiHttp)

describe(`testing endpoint product`, function () {
    let accessToken
    let accessTokenKedua
    let accessTokenAdminDua
    let userId
    let userIdDua
    let userIdTiga
    let productId
    //clear data
    before(function (done) {
        User.remove({}, () => {
            Product.remove({}, () => {
                done()
            })
        })
    })
    after(function (done) {
        User.remove({}, () => {
            Product.remove({}, () => {
                done()
            })
        })
    })

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
                accessToken = jwtSign(objUser)
                userId = String(objUser.id)
                done()

            })
    })
    //admin 2
    before(function (done) {
        let testUser = {
            fullName: `Ken Yen`,
            email: `test05@mail.com`,
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
                accessTokenAdminDua = jwtSign(objUser)
                userIdTiga = String(objUser.id)
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
                accessTokenKedua = jwtSign(objUser)
                userIdDua = String(objUser.id)
                done()

            })
    })

    describe(`POST /products/ create new product by admin`, function () {
        describe(`POST /products/ success case`, function () {
            describe(`POST /products/ with admin user`, function () {
                it(`should send object as response with 201 status code`, function (done) {
                    let newProduct = {
                        name: `Honda City S 2019`,
                        description: `Latest Product of Honda Company`,
                        stock: 4,
                        image: `Honda_city.jpg`,
                        price: 250000
                    }
                    chai
                        .request(app)
                        .post('/products')
                        .set('access_token', accessToken)
                        .send(newProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('_id')
                            expect(res.body).to.have.property('name')
                            expect(res.body).to.have.property('description')
                            expect(res.body).to.have.property('stock')
                            expect(res.body).to.have.property('image')
                            expect(res.body).to.have.property('price')
                            expect(res.body).to.have.property('seller')
                            expect(res.body.name).to.equal(newProduct.name)
                            expect(res.body.description).to.equal(newProduct.description)
                            expect(res.body.stock).to.equal(newProduct.stock)
                            expect(res.body.image).to.equal(newProduct.image)
                            expect(res.body.price).to.equal(newProduct.price)
                            expect(res.body.seller).to.equal(userId)
                            productId = res.body._id
                            done()
                        })
                })

                it(`should send object as response with 201 status code while image not provided`, function (done) {
                    let newProduct = {
                        name: `Toyota City S 2019`,
                        description: `Latest Product of Toyota Company`,
                        stock: 14,
                        image: ``,
                        price: 350000
                    }
                    chai
                        .request(app)
                        .post('/products')
                        .set('access_token', accessToken)
                        .send(newProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('name')
                            expect(res.body).to.have.property('description')
                            expect(res.body).to.have.property('stock')
                            expect(res.body).to.have.property('image')
                            expect(res.body).to.have.property('price')
                            expect(res.body).to.have.property('seller')
                            expect(res.body.name).to.equal(newProduct.name)
                            expect(res.body.description).to.equal(newProduct.description)
                            expect(res.body.stock).to.equal(newProduct.stock)
                            expect(res.body.image).to.equal(newProduct.image)
                            expect(res.body.price).to.equal(newProduct.price)
                            expect(res.body.seller).to.equal(userId)
                            done()
                        })
                })

                it(`should send object with stock equals to 1 as response with 201 status code while stock not provided`, function (done) {
                    let newProduct = {
                        name: `Toyota City S 2019`,
                        description: `Latest Product of Toyota Company`,
                        image: ``,
                        price: 350000
                    }
                    chai
                        .request(app)
                        .post('/products')
                        .set('access_token', accessToken)
                        .send(newProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('name')
                            expect(res.body).to.have.property('description')
                            expect(res.body).to.have.property('stock')
                            expect(res.body).to.have.property('image')
                            expect(res.body).to.have.property('price')
                            expect(res.body).to.have.property('seller')
                            expect(res.body.name).to.equal(newProduct.name)
                            expect(res.body.description).to.equal(newProduct.description)
                            expect(res.body.stock).to.equal(1)
                            expect(res.body.image).to.equal(newProduct.image)
                            expect(res.body.price).to.equal(newProduct.price)
                            expect(res.body.seller).to.equal(userId)
                            done()
                        })
                })
            })
        })
        describe(`POST /products/ failed case`, function () {
            describe(`POST /products/ with regular user`, function () {
                it(`should send object with message 'user not authorized to view this page' as response with 401 status code`, function (done) {
                    let newProduct = {
                        name: `Honda City S 2019`,
                        description: `Latest Product of Honda Company`,
                        stock: 4,
                        image: `Honda_city.jpg`,
                        price: 250000
                    }
                    chai
                        .request(app)
                        .post('/products')
                        .set('access_token', accessTokenKedua)
                        .send(newProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res).to.be.an('object')
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).to.equal('user not authorized to view this page')
                            done()
                        })

                })
            })

            describe(`POST /products/ without sending attributes`, function () {
                it(`should send object with message 'name is required' as response with 500 status code when attributes name empty`, function (done) {
                    let newProduct = {

                        description: `Latest Product of Honda Company`,
                        stock: 4,
                        image: `Honda_city.jpg`,
                        price: 250000
                    }
                    chai
                        .request(app)
                        .post('/products')
                        .set('access_token', accessToken)
                        .send(newProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(500)
                            expect(res).to.be.an('object')
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).to.include('name is required')
                            done()
                        })
                })
                it(`should send object with message 'price is required' as response with 500 status code when attributes price empty`, function (done) {
                    let newProduct = {
                        name: `Honda Bebek`,
                        description: `Latest Product of Honda Company`,
                        stock: 4,
                        image: `Honda_city.jpg`,

                    }
                    chai
                        .request(app)
                        .post('/products')
                        .set('access_token', accessToken)
                        .send(newProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(500)
                            expect(res).to.be.an('object')
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).to.include('price is required')
                            done()
                        })
                })
                it(`should send object with message 'description is required' as response with 500 status code when attributes description empty`, function (done) {
                    let newProduct = {
                        name: `Honda Bebek`,

                        stock: 4,
                        image: `Honda_city.jpg`,
                        price: 100000
                    }
                    chai
                        .request(app)
                        .post('/products')
                        .set('access_token', accessToken)
                        .send(newProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(500)
                            expect(res).to.be.an('object')
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).to.include('description is required')
                            done()
                        })
                })
            })

        })
    })

    describe(`GET /products/ get all products from database`, function () {
        describe(`GET /products/ success case`, function () {
            describe(`GET /products with admin user`, function () {
                it(`should send array as response with 200 status code`, function (done) {
                    chai
                        .request(app)
                        .get('/products')
                        .set('access_token', accessToken)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.be.an('array')
                            expect(res.body).to.have.length(3)
                            done()
                        })
                })
            })
            describe(`GET /products with regular user`, function () {
                it(`should send array as response with 200 status code`, function (done) {
                    chai
                        .request(app)
                        .get('/products')
                        .set('access_token', accessTokenKedua)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.be.an('array')
                            expect(res.body).to.have.length(3)
                            done()
                        })
                })
            })

        })
    })
    let dedata = {}
    describe(`PATCH /products/:productId update product data by product seller `, function () {
        describe(`PATCH /products/ success case`, function () {
            it(`should send response with status code 200`, function (done) {
                dedata = {
                    name: `Honda City S 2017`,
                    description: `Cheapest Product of Honda Company`,
                    stock: 5,
                    price: 550000
                }
                chai
                    .request(app)
                    .put(`/products/${productId}`)
                    .set('access_token', accessToken)
                    .send(dedata)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('description')
                        expect(res.body).to.have.property('image')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('seller')
                        expect(res.body.name).to.equal(dedata.name)
                        expect(res.body.description).to.equal(dedata.description)
                        expect(res.body.stock).to.equal(dedata.stock)
                        expect(res.body.price).to.equal(dedata.price)
                        expect(res.body._id).to.equal(productId)
                        done()
                    })
            })
        })
        describe(`PATCH /products/ failed case`, function () {
            it(`should send response with status code 401 and message 'unauthorized access' when other seller try to patch product `, function (done) {
                let updatedData = {
                    name: `Honda City S 2017`,
                    description: `Cheapest Product of Honda Company`,
                    stock: 5,
                    price: 550000
                }
                chai
                    .request(app)
                    .put(`/products/${productId}`)
                    .set('access_token', accessTokenAdminDua)
                    .send(updatedData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('unauthorized access')
                        done()
                    })
            })
            it(`should send response with status code 400 and message 'product not found' when productId is not found `, function (done) {
                let updatedData = {
                    name: `Honda City S 2017`,
                    description: `Cheapest Product of Honda Company`,
                    stock: 5,
                    price: 550000
                }
                chai
                    .request(app)
                    .put(`/products/912390129391`)
                    .set('access_token', accessToken)
                    .send(updatedData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('product not found')
                        done()
                    })
            })
        })

    })

    describe(`DELETE /products/:productId delete product data by product seller `, function() {
        
        describe(`DELETE /products/ failed case`, function(){
            it(`should send response with status code 401 and message 'unauthorized access' when other seller try to delete product `, function (done) {
                chai
                    .request(app)
                    .delete(`/products/${productId}`)
                    .set('access_token', accessTokenAdminDua)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('unauthorized access')
                        done()
                    })
            })
            it(`should send response with status code 400 and message 'product not found' when productId is not found `, function (done) {
                chai
                    .request(app)
                    .delete(`/products/912390129392`)
                    .set('access_token', accessToken)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('product not found')
                        done()
                    })
            })
        })
        describe(`DELETE /products/ success case`, function(){
            it(`should send response with status code 200 and deleted object data`, function(done){
                chai
                    .request(app)
                    .delete(`/products/${productId}`)
                    .set('access_token', accessToken)
                    .end(function(err,res) {
                        
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        expect(res.body)
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('description')
                        expect(res.body).to.have.property('image')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('seller')
                        expect(res.body.name).to.equal(dedata.name)
                        expect(res.body.description).to.equal(dedata.description)
                        expect(res.body.stock).to.equal(dedata.stock)
                        expect(res.body.price).to.equal(dedata.price)
                        expect(res.body._id).to.equal(productId)
                        done()
                    })
            })
        })
    })



})