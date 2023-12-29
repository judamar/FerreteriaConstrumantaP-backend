import { Router } from 'express'
import Sales from '../controllers/sales.controller.js'

const SalesRouter = Router()

SalesRouter
  .get('/', Sales.getAll)
  .get('/:id', Sales.getById)
  .post('/', Sales.insert)
  .put('/:id', Sales.update)
  .delete('/:id', Sales.remove)

export default SalesRouter
