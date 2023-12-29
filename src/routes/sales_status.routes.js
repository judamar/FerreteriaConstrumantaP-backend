import { Router } from 'express'
import SalesStatuses from '../controllers/sales_statuses.controller.js'

const SalesStatusRouter = Router()

SalesStatusRouter
  .get('/', SalesStatuses.getAll)
  .get('/:id', SalesStatuses.getById)
  .post('/', SalesStatuses.create)
  .put('/:id', SalesStatuses.update)
  .delete('/:id', SalesStatuses.remove)

export default SalesStatusRouter
