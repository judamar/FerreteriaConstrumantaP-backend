import { Router } from 'express'
import TMStatus from '../controllers/tools_machines_statuses.controller.js'

const TMStatusRouter = Router()

TMStatusRouter
  .get('/', TMStatus.getAll)
  .get('/:id', TMStatus.getById)
  .post('/', TMStatus.create)
  .put('/:id', TMStatus.update)
  .delete('/:id', TMStatus.remove)

export default TMStatusRouter
