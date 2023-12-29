import { Router } from 'express'
import Reservation from '../controllers/reservation.controller.js'

const ReservationRouter = Router()

ReservationRouter
  .get('/', Reservation.getAllReservations)
  .get('/:id', Reservation.getReservationById)
  .post('/', Reservation.insertReservation)
  .put('/:id', Reservation.updateReservation)
  .delete('/:id', Reservation.deleteReservation)

export default ReservationRouter
