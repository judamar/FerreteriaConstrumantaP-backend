import { Router } from 'express'
import Sales from '../controllers/sales.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const SalesRouter = Router()

// Middleware for authenticathe the user and check if is admin
SalesRouter.use(authUser, authAdmin)

/* `SalesRouter` is a router object from the Express framework in JavaScript. It is used to define the
routes for handling sales-related requests. The routes include creating a new sale, getting all
sales, getting a sale by its ID, getting sales by user name, updating a sale, and deleting a sale.
The routes are associated with corresponding methods from the `Sales` controller. Additionally, the
router uses the `authUser` and `authAdmin` middlewares to authenticate the user and check if the
user is an admin before allowing access to the routes. */
SalesRouter
  .post('/', Sales.create)
  .get('/', Sales.getAll)
  .get('/:id', Sales.getById)
  .get('/nombre/:nombre', Sales.getByUserName)
  .put('/:id', Sales.update)
  .delete('/:id', Sales.remove)

export default SalesRouter
