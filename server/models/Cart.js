const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product id required']
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id required']
    },
    quantity: {
        type: Number,
        default: 1
    },
    checkOut: {
        type: Boolean,
        default: false
    },
    confirmation: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart