import { Router } from 'express'
import SalesStatuses from '../controllers/sales_statuses.controller.js'

const SalesStatusRouter = Router()

SalesStatusRouter
  .post('/', SalesStatuses.create)
  .get('/', SalesStatuses.getAll)
  .get('/:id', SalesStatuses.getById)
  .put('/:id', SalesStatuses.update)
  .delete('/:id', SalesStatuses.remove)

export default SalesStatusRouter
