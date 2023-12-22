import { Router } from 'express'
import Product from '../controllers/products.controller.js'

const ProductRouter = Router()

ProductRouter
  .get('/', Product.getAllProducts)
  .get('/:id', Product.getOneProduct)
  .post('/', Product.createNewProduct)
  .put('/:id', Product.updateOneProduct)
  .delete('/:id', Product.deleteOneProduct)

export default ProductRouter
