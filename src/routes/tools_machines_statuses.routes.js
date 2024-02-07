import { Router } from 'express'
import TMStatus from '../controllers/tools_machines_statuses.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const TMStatusRouter = Router()

/* `TMStatusRouter` is a router object that handles the routes for the `tools_machines_statuses`
resource. It defines the HTTP methods and corresponding controller methods for creating, retrieving,
updating, and deleting `tools_machines_statuses` records. It also includes middleware functions for
user authentication. */
TMStatusRouter
  .post('/', authUser, authAdmin, TMStatus.create)
  .get('/', TMStatus.getAll)
  .get('/:id', TMStatus.getById)
  .put('/:id', authUser, authAdmin, TMStatus.update)
  .delete('/:id', authUser, authAdmin, TMStatus.remove)

export default TMStatusRouter
