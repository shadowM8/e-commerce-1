const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const server = process.env.SERVER

mongoose.connect(`mongodb://localhost/db_ecom_${server}`, {useNewUrlParser:true})

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())

const userRoute = require('./routes/user')

app.use('/users', userRoute)

app.listen(port, ()=> {
    console.log(`listen on port ${port}`)
})

module.exports = app
