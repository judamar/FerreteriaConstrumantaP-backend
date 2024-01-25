import { Router } from 'express'
import Reservation from '../controllers/reservation.controller.js'

const ReservationRouter = Router()

ReservationRouter
  .post('/', Reservation.create)
  .get('/', Reservation.getAll)
  .get('/:id', Reservation.getById)
  .put('/:id', Reservation.update)
  .delete('/:id', Reservation.remove)

export default ReservationRouter
