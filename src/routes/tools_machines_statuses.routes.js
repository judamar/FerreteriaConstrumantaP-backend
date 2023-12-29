import { Router } from 'express'
import TMStatus from '../controllers/tools_machines_statuses.controller.js'

const TMStatusRouter = Router()

TMStatusRouter
  .get('/', TMStatus.getAllStatus)
  .get('/:id', TMStatus.getStatusById)
  .post('/', TMStatus.insertStatus)
  .put('/:id', TMStatus.updateStatus)
  .delete('/:id', TMStatus.deleteStatus)

export default TMStatusRouter
