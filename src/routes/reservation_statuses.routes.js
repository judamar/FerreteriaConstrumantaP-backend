import { Router } from 'express'
import ReservationStatus from '../controllers/reservation_statuses.controller.js'

const ReservationStatusRouter = Router()

ReservationStatusRouter
  .post('/', ReservationStatus.create)
  .get('/', ReservationStatus.getAll)
  .get('/:id', ReservationStatus.getById)
  .put('/:id', ReservationStatus.update)
  .delete('/:id', ReservationStatus.remove)

export default ReservationStatusRouter
