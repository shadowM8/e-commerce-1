const router = require('express').Router()
const cartController = require('../controllers/cart')
const authenticate = require('../middlewares/authenticate')
const authorizeCart = require('../middlewares/authorizeCart')

router.use(authenticate)
router.post('/',  cartController.create)
router.get('/', cartController.getAll)
router.patch('/', cartController.checkOut)
router.get('/admin', cartController.getAllAdminCarts)

router.use('/:cartId', authorizeCart )

router.patch('/:cartId', cartController.confirm)

router.delete('/:cartId', cartController.delete )

module.exports = router