import { Router } from 'express'
import Reservation from '../controllers/reservation.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const ReservationRouter = Router()

// Middleware for authenticathe the user and check if is admin
ReservationRouter.use(authUser, authAdmin)

/* `ReservationRouter` is a router object that handles different HTTP requests related to reservations.
It is responsible for defining the routes and associating them with the corresponding controller
methods from the `Reservation` controller. The routes include creating a reservation, getting all
reservations, getting a reservation by ID, getting reservations by user name, getting reservations
by tool name, updating a reservation, updating the state of a reservation, updating the end date of
a reservation, and deleting a reservation. */
ReservationRouter
  .post('/', Reservation.create)
  .get('/', Reservation.getAll)
  .get('/:id', Reservation.getById)
  .get('/usuario/:userName', Reservation.getByUserName)
  .get('/herramienta/:herramienta', Reservation.getByToolName)
  .put('/:id', Reservation.update)
  .patch('/estado/:id', Reservation.updateState)
  .patch('/fecha/:id', Reservation.updateEndDate)
  .delete('/:id', Reservation.remove)

export default ReservationRouter
