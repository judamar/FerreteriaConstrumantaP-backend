import { Router } from 'express'
import ReservationStatus from '../controllers/reservation_statuses.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const ReservationStatusRouter = Router()

ReservationStatusRouter.use(authUser, authAdmin)

ReservationStatusRouter
  .post('/', ReservationStatus.create)
  .get('/', ReservationStatus.getAll)
  .get('/:id', ReservationStatus.getById)
  .put('/:id', ReservationStatus.update)
  .delete('/:id', ReservationStatus.remove)

export default ReservationStatusRouter
