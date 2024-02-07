import { Router } from 'express'
import ReservationStatus from '../controllers/reservation_statuses.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const ReservationStatusRouter = Router()

// Middleware for authenticathe the user and check if is admin
ReservationStatusRouter.use(authUser, authAdmin)

/* `ReservationStatusRouter` is a router object that handles the routes related to reservation
statuses. It imports the `Router` object from the `express` library and defines the routes for
creating, getting all, getting by ID, updating, and deleting reservation statuses. It also uses the
`authUser` and `authAdmin` middlewares to authenticate the user before accessing these routes. */
ReservationStatusRouter
  .post('/', ReservationStatus.create)
  .get('/', ReservationStatus.getAll)
  .get('/:id', ReservationStatus.getById)
  .put('/:id', ReservationStatus.update)
  .delete('/:id', ReservationStatus.remove)

export default ReservationStatusRouter
