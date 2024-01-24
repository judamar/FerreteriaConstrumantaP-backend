import { Router } from 'express'
import Reservation from '../controllers/reservation.controller.js'

const ReservationRouter = Router()

ReservationRouter
  .get('/', Reservation.getAll)
  .get('/:id', Reservation.getById)
  .post('/', Reservation.create)
  .put('/:id', Reservation.update)
  .delete('/:id', Reservation.remove)

export default ReservationRouter
