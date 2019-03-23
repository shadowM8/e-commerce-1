const Product = require('../models/Product')

module.exports = {
    create: (req, res) => {
        let image = req.file ? req.file.cloudStoragePublicUrl : req.body.image || ''
        Product
            .create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image,
                stock: req.body.stock,
                seller: req.authenticUser.id
            })
            .then(product => {
                res
                    .status(201)
                    .json(product)
            })
            .catch(err => {
                // console.log(err)
                res
                .status(500)
                .json(err)
            })
    },
    getAll: (req, res) => {
        Product
            .find({}).populate('seller')
            .then(products => {
                if (req.query.name) {
                    products = products.filter(product => {
                        return new RegExp(".*" + req.query.name + ".*", "i").test(product.name)
                    })
                }
                res
                .status(200)
                .json(products)
            })
            .catch(err => {
                console.log(err)
                res
                .status(500)
                .json(err)
            })
    },
    update: (req, res) => {
        let image = req.file ? req.file.cloudStoragePublicUrl : '';
        let input = {};
        for (let key in req.body) {
            if (key === 'name' ||
                key === 'description' ||
                key === 'stock' ||
                key === 'price') {
                input[key] = req.body[key]
            }
        }

        if (image.length) {
            input.image = image
        }

        Product
            .findByIdAndUpdate(req.params.productId, { $set: input }, { new: true })
            .then(product => {
                if (!product) res.status(400).json({ message: 'product not found' })
                res
                .status(200)
                .json(product)
            })
            .catch(err => {
                console.log(err)
                res
                .status(500)
                .json(err)
            })
    },
    delete: (req, res) => {
        Product
            .findByIdAndDelete(req.params.productId)
            .then(product => {
                if (product) res.status(400).json({ message: `product not found` })
                res
                .status(200)
                .json(product)
            })
            .catch(err => {
                console.log(err)
                res
                .status(500)
                .json(err)
            })
    }
}