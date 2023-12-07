import { Router } from 'express'
import Product from '../controllers/products.controller.js'

const ProductRouter = Router()

ProductRouter
  .get('/', Product.getAllProducts)
  .get('/:productId', Product.getOneProduct)
  .post('/:productId', Product.createNewProduct)
  .put('/:productId', Product.updateOneProduct)
  .delete('/:productId', Product.deleteOneProduct)

export default ProductRouter
