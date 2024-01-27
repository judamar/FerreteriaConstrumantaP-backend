import { Router } from 'express'
import Reservation from '../controllers/reservation.controller.js'

const ReservationRouter = Router()

ReservationRouter
  .post('/', Reservation.create)
  .get('/', Reservation.getAll)
  .get('/:id', Reservation.getById)
  .get('/usuario/:userName', Reservation.getByUserName)
  .put('/:id', Reservation.update)
  .delete('/:id', Reservation.remove)

export default ReservationRouter
