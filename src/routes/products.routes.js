import { Router } from 'express'
import Product from '../controllers/products.controller.js'

const ProductRouter = Router()

ProductRouter
  .get('/', Product.getAll)
  .get('/id/:id', Product.getById)
  .get('/search/:name', Product.getByName)
  .get('/category/:category', Product.getByCategory)
  .post('/', Product.create)
  .put('/:id', Product.update)
  .delete('/:id', Product.remove)

export default ProductRouter
