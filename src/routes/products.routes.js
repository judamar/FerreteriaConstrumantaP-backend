import { Router } from 'express'

const ProductRouter = Router()

ProductRouter.get('/', (req, res) => {
  res.send('aqui hay productos')
})

ProductRouter.get('/:id', (req, res) => {
  res.send(`mostrando producto con id ${req.params.id}`)
})

export default ProductRouter
