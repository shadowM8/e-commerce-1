const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encryptPass } = require('../helpers/util')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, `email must be filled`],
        trim: true,
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: [checkUnique, `email is already taken`]
    },
    password: {
        type: String,
        required: [true, `password must be filled`],
        minlength: [5, 'password minimum length is 5 characters']
    },
    image: {
        type: String,
        default: `https://iweek.org.za/wp-content/uploads/2015/09/no-profile-photo1.jpg`
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    fullName: {
        type: String,
        required: [true, `fullName must be filled`]
    }
})

userSchema.pre('save', function (next) {
    if (this.password) this.password = encryptPass(this.password)

    next()
})

function checkUnique() {
    return new Promise((resolve, reject) => {
        User.findOne({ email: this.email, _id: { $ne: this._id } })
            .then(data => {
                if (data) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
            .catch(err => {
                reject(false)
            })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User