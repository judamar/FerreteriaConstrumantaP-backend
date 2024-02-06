import { Router } from 'express'
import TMStatus from '../controllers/tools_machines_statuses.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const TMStatusRouter = Router()

TMStatusRouter
  .post('/', authUser, authAdmin, TMStatus.create)
  .get('/', TMStatus.getAll)
  .get('/:id', TMStatus.getById)
  .put('/:id', authUser, authAdmin, TMStatus.update)
  .delete('/:id', authUser, authAdmin, TMStatus.remove)

export default TMStatusRouter
