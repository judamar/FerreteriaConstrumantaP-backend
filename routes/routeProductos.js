import { Router } from 'express'

const ProductRouter = Router()

ProductRouter.get('/', (req, res) => {
  res.send('aqui hay productos')
})

export default ProductRouter
