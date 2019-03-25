const router = require('express').Router()
const productController = require('../controllers/product')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorizeProduct')
const isAdmin = require('../middlewares/isAdmin')
const image = require('../middlewares/image')

router.get('/', productController.getAll)

router.use(authenticate)

router.get('/:productId', productController.getOne)

router.use(isAdmin)

router.post('/', image.multer.single('image'), image.sendUploadToGCS, productController.create)
router.get('/admin', productController.getAllSellerProduct)
router.use('/:productId',authorize)

router.put('/:productId', productController.update)
router.delete('/:productId', productController.delete)

module.exports = router