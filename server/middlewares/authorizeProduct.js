const Product = require('../models/Product')

function authorize(req, res, next) {

  Product
    .findOne({
      _id: req.params.productId
    })
    .then(product => {
      
      if (!product) res.status(400).json({ message: 'product not found' })

      else {
        if (String(product.seller) === String(req.authenticUser.id)) {
          next()
        } else {
          res
            .status(401)
            .json({
              message: "unauthorized access"
            })
        }
      } 
    })
    .catch(err => {
      console.log(err)
      res
        .status(500)
        .json({
          message: "internal server error on authorization",
          err
        })
    })
}

module.exports = authorize