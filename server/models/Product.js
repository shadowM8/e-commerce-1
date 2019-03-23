const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        default: 1
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `seller is required`]
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

module.exports = Product