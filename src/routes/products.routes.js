import { Router } from 'express'
import multer from 'multer'
import Product from '../controllers/products.controller.js'

const storage = multer.diskStorage({
  destination: 'src/images/public/',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const ProductRouter = Router()

ProductRouter
  .post('/', upload.single('image'), Product.create)
  .get('/', Product.getAll)
  .get('/id/:id', Product.getById)
  .get('/search/:name', Product.getByName)
  .get('/category/:category', Product.getByCategory)
  .get('/key/:key', Product.getByKey)
  .put('/:id', Product.update)
  .patch('/:id', upload.single('image'), Product.updateImage)
  .delete('/:id', Product.remove)

export default ProductRouter
