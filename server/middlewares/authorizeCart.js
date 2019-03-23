const Cart = require('../models/Cart')

function authorize(req, res, next) {

  Cart
    .findOne({
      _id: req.params.cartId
    })
    .then(cart => {
      // console.log({buyer:cart.buyer, authuser: req.authenticUser.id})
      if (!cart) res.status(400).json({ message: 'cart not found' })
      else if (cart.buyer.toString() == req.authenticUser.id.toString()) {
        next()
      } else {
        res
          .status(401)
          .json({
            message: "unauthorized access"
          })
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