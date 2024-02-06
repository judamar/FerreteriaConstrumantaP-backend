import { Router } from 'express'
import SalesDetail from '../controllers/sales_details.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const SalesDetailRouter = Router()

SalesDetailRouter.use(authUser, authAdmin)

SalesDetailRouter
  .post('/', SalesDetail.create)
  .get('', SalesDetail.getAll)
  .get('/:id', SalesDetail.getById)
  .get('/ventas/:id', SalesDetail.getBySaleId)
  .put('/:id', SalesDetail.update)
  .delete('/:id', SalesDetail.remove)

export default SalesDetailRouter
