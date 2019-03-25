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
    confirm: (req,res) => {
        let confirmationcart
        Cart
            .findOne({
                _id: req.params.cartId
            })
            .then(cart => {
                confirmationcart = cart
                cart.confirmation = true
                cart.save()
            })
            .then(()=>{
                res.status(200).json(confirmationcart)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: `internal server error`})
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
                        cart.save()
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
    getAll: (req,res) => {
        Cart
            .find({buyer: req.authenticUser.id}).populate('product').populate('buyer')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message:`internal server error`})
            })
    },
    delete: (req,res) => {
        let deletedCart
        Cart
            .findOneAndDelete({_id: req.params.cartId})
            .then(cart => {
                // res.status(200).json(cart)
                deletedCart = cart
                return Product
                    .findOne({ _id: cart.product })
            })
            .then(product => {
                if(!product) throw `product not found`
                else {
                    product.stock = product.stock + deletedCart.quantity
                    return product.save()
                }
            })
            .then(()=>{
                res.status(200).json(deletedCart)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}