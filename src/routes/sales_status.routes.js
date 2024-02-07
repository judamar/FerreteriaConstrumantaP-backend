import { Router } from 'express'
import SalesStatuses from '../controllers/sales_statuses.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const SalesStatusRouter = Router()

// Middleware for authenticathe the user and check if is admin
SalesStatusRouter.use(authUser, authAdmin)

/* `SalesStatusRouter` is a router object that handles the routes related to sales statuses. It imports
the `Router` object from the `express` library and defines various routes for creating, getting,
updating, and deleting sales statuses. It also includes middleware functions `authUser` and
`authAdmin` to authenticate the user and check if the user is an admin before allowing access to
these routes. */
SalesStatusRouter
  .post('/', SalesStatuses.create)
  .get('/', SalesStatuses.getAll)
  .get('/:id', SalesStatuses.getById)
  .put('/:id', SalesStatuses.update)
  .delete('/:id', SalesStatuses.remove)

export default SalesStatusRouter
