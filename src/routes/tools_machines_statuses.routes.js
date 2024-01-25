import { Router } from 'express'
import TMStatus from '../controllers/tools_machines_statuses.controller.js'

const TMStatusRouter = Router()

TMStatusRouter
  .post('/', TMStatus.create)
  .get('/', TMStatus.getAll)
  .get('/:id', TMStatus.getById)
  .put('/:id', TMStatus.update)
  .delete('/:id', TMStatus.remove)

export default TMStatusRouter
