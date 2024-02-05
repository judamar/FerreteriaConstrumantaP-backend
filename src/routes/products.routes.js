import { Router } from 'express'
import multer from 'multer'
import Product from '../controllers/products.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const storage = multer.diskStorage({
  destination: 'src/images/public/',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const ProductRouter = Router()

ProductRouter
  .post('/', authUser, authAdmin, upload.single('image'), Product.create)
  .get('/', Product.getAll)
  .get('/id/:id', Product.getById)
  .get('/search/:name', Product.getByName)
  .get('/category/:category', Product.getByCategory)
  .get('/key/:key', Product.getByKey)
  .put('/:id', authUser, authAdmin, Product.update)
  .patch('/:id', authUser, authAdmin, upload.single('image'), Product.updateImage)
  .delete('/:id', authUser, authAdmin, Product.remove)

export default ProductRouter
