const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const User = require('../models/User')
const app = require('../app')
const { comparePass, jwtVerify } = require('../helpers/util')

chai.use(chaiHttp)

//create User
describe(`testing endpoint user`, function () {
    //clear data
    before(function (done) {
        User.remove({}, () => {
            done()
        })
    })
    after(function (done) {
        User.remove({}, () => {
            done()
        })
    })
    let userEmail
    let userPass
    let userId
    let userRole
    let adminEmail
    let adminPass
    let adminId
    let adminRole
    describe(`POST /users/ for create new user`, function () {
        describe(`POST /users/ success case`, function () {
            it(`should send response with status code 201, and is an object when create regular user`, function (done) {
                let regularUser = {
                    email: `anton@mail.com`,
                    password: `12345`,
                    fullName: `Anton Wibisono`,
                    role: `user`
                }

                chai
                    .request(app)
                    .post('/users/')
                    .send(regularUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('fullName')
                        expect(res.body).to.have.property('email')
                        expect(res.body).to.have.property('password')
                        expect(res.body).to.have.property('role')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('image')
                        expect(res.body.role).to.equal('user')
                        expect(res.body.email).to.equal(regularUser.email)
                        expect(comparePass(regularUser.password, res.body.password)).to.equal(true)
                        userEmail = res.body.email
                        userPass = regularUser.password
                        userId = res.body._id
                        userRole = res.body.role
                        done()
                    })
            })

            it(`should send response that is an object with status code 201 when create admin/seller user`, function (done) {
                let seller = {
                    email: `yui@mail.com`,
                    password: `12345`,
                    fullName: `Yui Yoshioka`,
                    role: `admin`
                }

                chai
                    .request(app)
                    .post('/users/')
                    .send(seller)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('fullName')
                        expect(res.body).to.have.property('email')
                        expect(res.body).to.have.property('password')
                        expect(res.body).to.have.property('role')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('image')
                        expect(res.body.role).to.equal('admin')
                        expect(res.body.email).to.equal(seller.email)
                        expect(comparePass(seller.password, res.body.password)).to.equal(true)
                        adminEmail = res.body.email
                        adminPass = seller.password
                        adminId = res.body._id
                        adminRole = res.body.role
                        done()
                    })
            })
        })
        describe(`POST /users/ failed case`, function () {
            it(`should send response with status code 500 and send message 'fullName must be filled' when user not send fullName`, function (done) {
                let newUser = {
                    email: `dodo@mail.com`,
                    password: `12345`,
                    fullName: '',
                    role: 'user'
                }
                chai
                    .request(app)
                    .post('/users/')
                    .send(newUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.include(`fullName must be filled`)
                        done()
                    })
            })

            it(`should send response with status code 500 and send message 'is not a valid enum value' when user role is not admin or user`, function (done) {
                let newUser = {
                    email: `dodo@mail.com`,
                    password: `12345`,
                    fullName: 'Dododododo',
                    role: 'watcher'
                }
                chai
                    .request(app)
                    .post('/users/')
                    .send(newUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.include(`is not a valid enum value`)
                        done()
                    })
            })

            it(`should send response with status code 500 and send message 'password must be filled' when user not send password`, function (done) {
                let newUser = {
                    email: `dodo@mail.com`,
                    password: ``,
                    fullName: 'Dede Yesef',
                    role: 'user'
                }
                chai
                    .request(app)
                    .post('/users/')
                    .send(newUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.include(`password must be filled`)
                        done()
                    })
            })

            it(`should send response with status code 500 and send message 'email must be filled' when user not send email`, function (done) {
                let newUser = {
                    email: ``,
                    password: `12345`,
                    fullName: 'Dede Yesef',
                    role: 'user'
                }
                chai
                    .request(app)
                    .post('/users/')
                    .send(newUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.include(`email must be filled`)
                        done()
                    })
            })
        })
    })

    describe(`POST /users/login for user login`, function () {
        describe(`POST /users/login success case`, function () {
            it(`should send response with status code 200, and is an object when regular user login`, function (done) {
                let loginData = {
                    email: userEmail,
                    password: userPass,
                }

                chai
                    .request(app)
                    .post('/users/login')
                    .send(loginData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('access_token')
                        expect(res.body.access_token).to.be.a('string')
                        let decoded = jwtVerify(res.body.access_token)
                        expect(decoded.email).to.equal(loginData.email)
                        expect(decoded.id).to.equal(userId)
                        expect(decoded.role).to.equal(userRole)
                        done()
                    })
            })

            it(`should send response with status code 200, and is an object when admin user login`, function (done) {
                let adminLoginData = {
                    email: adminEmail,
                    password: adminPass,
                }

                chai
                    .request(app)
                    .post('/users/login')
                    .send(adminLoginData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('access_token')
                        expect(res.body.access_token).to.be.a('string')
                        let decoded = jwtVerify(res.body.access_token)
                        expect(decoded.email).to.equal(adminLoginData.email)
                        expect(decoded.id).to.equal(adminId)
                        expect(decoded.role).to.equal(adminRole)
                        done()
                    })
            })
        })
        describe(`POST /users/login failed case`, function() {
            it(`should send response with status code 400 and message 'invalid username/password', when email is incorrect`, function (done) {
                let loginData = {
                    email : 'John@mail.com',
                    password : 'acak'
                }

                chai
                    .request(app)
                    .post('/users/login')
                    .send(loginData)
                    .end(function(err,res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('invalid username/password')
                        done()
                    })
            })

            it(`should send response with status code 400 and message 'invalid username/password', when password is incorrect`, function (done) {
                let loginData = {
                    email : userEmail,
                    password : 'acak'
                }

                chai
                    .request(app)
                    .post('/users/login')
                    .send(loginData)
                    .end(function(err,res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('invalid username/password')
                        done()
                    })
            })
        })
    })
})