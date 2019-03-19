const chai = require('chai')
chai.should()
const chaiHttp = require('chai-http')
const User = require('../models/User')
const app = require('../app')

chai.use(chaiHttp)

//create User
describe(`testing endpoint user`, function () {
    before(function (done){
        User.remove({}, () => {
            done()
        })
    })
    after(function(done){
        User.remove({}, () => {
            done()
        })
    })

    describe(`POST /users/register for create new user`, function () {
        describe(`POST /users/register success case`, function () {
            it(`should send response with status code 201, and is an object when create regular user`, function (done) {
                let regularUser = {
                    email: `anton@mail.com`,
                    password: `12345`,
                    fullName: `Anton Wibisono`,
                    role: `reguler`
                }

                chai
                    .request(app)
                    .post('/users/register')
                    .send(regularUser)
                    .end(function (err, response) {
                        err.should.be.null
                        response.should.have.status(201)
                        response.body.should.be.an('object')
                        done()
                    })
            })

            it(`should send response that is an object with status code 201 when create admin/seller user`, function (done) {
                let seller = {
                    email: `yui@mail.com`,
                    password: `12345`,
                    fullName: `Yui Yoshioka`,
                    role: `seller`
                }

                chai
                    .request(app)
                    .post('/users/register')
                    .send(seller)
                    .end(function (err, response) {
                        err.should.be.null
                        response.should.have.status(201)
                        response.body.should.be.an('object')
                        done()
                    })
            })
        })
        describe(`POST /users/register failed case`, function () {
            it(`should send response with status code 500 and send message 'fullName must be filled' when user not send fullName`, function (done) {
                let newUser = {
                    email: `dodo@mail.com`,
                    password: `12345`,
                    fullName: ''
                }
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function (err, response) {
                        err.should.be.null
                        response.should.have.status(500)
                        response.body.should.be.an(`object`)
                        response.body.should.have.property('message')
                        response.body.message.should.include(`fullName must be filled`)
                        done()
                    })
            })

            it(`should send response with status code 500 and send message 'password must be filled' when user not send password`, function (done) {
                let newUser = {
                    email: `dodo@mail.com`,
                    password: ``,
                    fullName: 'Dede Yesef'
                }
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function (err, response) {
                        err.should.be.null
                        response.should.have.status(500)
                        response.body.should.be.an(`object`)
                        response.body.should.have.property('message')
                        response.body.message.should.include(`password must be filled`)
                        done()
                    })
            })

            it(`should send response with status code 500 and send message 'email must be filled' when user not send email`, function (done) {
                let newUser = {
                    email: ``,
                    password: `12345`,
                    fullName: 'Dede Yesef'
                }
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function (err, response) {
                        err.should.be.null
                        response.should.have.status(500)
                        response.body.should.be.an(`object`)
                        response.body.should.have.property('message')
                        response.body.message.should.include(`email must be filled`)
                        done()
                    })
            })
        })
    })
})