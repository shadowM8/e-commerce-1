const Cart = require('../models/Cart')
const Product = require('../models/Product')

module.exports = {
    create: (req, res) => {
        let quantity
        if(!req.body.quantity) quantity = 1
        else quantity = req.body.quantity
        Product
            .findOne({ _id: req.body.product })
            .then(product => {
                if(!product) throw `product not found`
                
                if (product.stock < quantity) {
                    // res.status(400).json({ message: `product stock is not enough` })
                    throw `product stock is not enough`
                }
                else {
                    product.stock = product.stock - quantity
                    return product.save()
                }
            })
            .then(() => {
                return Cart
                    .create({
                        product: req.body.product,
                        buyer: req.authenticUser.id,
                        quantity: req.body.quantity
                    })
            })
            .then(cart => {
                res.status(201).json(cart)
            })
            .catch(err => {
                // console.log(err)
                res.status(500).json({ message: err })
            })
    },
    checkOut: (req, res) => {
        let checked
        Cart
            .find({
                buyer: req.authenticUser.id
            })
            .then(carts => {
                if (carts.length == 0) res.status(400).json({ message: `no product to checked!` })
                else {
                    carts.forEach(cart => {
                        cart.checkOut = true
                    })
                    // checked = carts.map(cart => {
                    //     return {
                    //         ...cart,
                    //         checkOut: true
                    //     }
                    // })
                    // console.log(checked)
                    res.status(200).json(carts)
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: `internal server error`, err })
            })
    },
    delete: (req,res) => {
        Cart
            .findOneAndDelete({_id: req.params.cartId})
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}