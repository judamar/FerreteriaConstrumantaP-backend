import { Router } from 'express'
import SalesDetail from '../controllers/sales_details.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const SalesDetailRouter = Router()

// Middleware for authenticathe the user and check if is admin
SalesDetailRouter.use(authUser, authAdmin)

/* `SalesDetailRouter` is a router object that handles the routes related to sales details. It imports
the `Router` object from the `express` library and creates an instance of it. It then uses
middleware functions `authUser` and `authAdmin` to authenticate the user and check if the user is an
admin. The router object defines various routes such as creating a sales detail, getting all sales
details, getting a sales detail by ID, getting sales details by sale ID, updating a sales detail,
and deleting a sales detail. These routes are handled by corresponding methods from the
`SalesDetail` controller. Finally, the router object is exported as the default export of the
module. */
SalesDetailRouter
  .post('/', SalesDetail.create)
  .get('', SalesDetail.getAll)
  .get('/:id', SalesDetail.getById)
  .get('/ventas/:id', SalesDetail.getBySaleId)
  .put('/:id', SalesDetail.update)
  .delete('/:id', SalesDetail.remove)

export default SalesDetailRouter
