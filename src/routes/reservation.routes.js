import { Router } from 'express'
import Reservation from '../controllers/reservation.controller.js'

const ReservationRouter = Router()

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
