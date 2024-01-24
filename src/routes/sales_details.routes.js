import { Router } from 'express'
import SalesDetail from '../controllers/sales_details.controller.js'

const SalesDetailRouter = Router()

SalesDetailRouter
  .get('detalles_ventas', SalesDetail.getAll)
  .get('detalles_ventas/:id', SalesDetail.getById)
  .post('detalles_ventas', SalesDetail.create)
  .put('detalles_ventas/:id', SalesDetail.update)
  .delete('detalles_ventas/:id', SalesDetail.remove)

export default SalesDetailRouter
