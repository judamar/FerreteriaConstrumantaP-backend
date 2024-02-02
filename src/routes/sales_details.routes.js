import { Router } from 'express'
import SalesDetail from '../controllers/sales_details.controller.js'

const SalesDetailRouter = Router()

SalesDetailRouter
  .post('/', SalesDetail.create)
  .get('', SalesDetail.getAll)
  .get('/:id', SalesDetail.getById)
  .get('/ventas/:id', SalesDetail.getBySaleId)
  .put('/:id', SalesDetail.update)
  .delete('/:id', SalesDetail.remove)

export default SalesDetailRouter
