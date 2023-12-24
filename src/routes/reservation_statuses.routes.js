import { Router } from 'express'
import ReservationStatus from '../controllers/reservation_statuses.controller.js'

const ReservationStatusRouter = Router()

ReservationStatusRouter
  .get('/', ReservationStatus.getAllReservationStatuses)

export default ReservationStatusRouter
