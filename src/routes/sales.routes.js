import { Router } from 'express'
import Sales from '../controllers/sales.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const SalesRouter = Router()

SalesRouter.use(authUser, authAdmin)

SalesRouter
  .post('/', Sales.create)
  .get('/', Sales.getAll)
  .get('/:id', Sales.getById)
  .get('/nombre/:nombre', Sales.getByUserName)
  .put('/:id', Sales.update)
  .delete('/:id', Sales.remove)

export default SalesRouter
