import Reservation from '../models/reservation.model.js'

const getAllReservations = async (req, res) => {
  const result = await Reservation.getAllReservations()
  res.status(200).json({ status: 'OK', result })
}

const getReservationById = async (req, res) => {
  const result = await Reservation.getReservationById(req.params.id)
  res.status(200).json({ status: 'OK', result })
}

const insertReservation = async (req, res) => {
  const result = await Reservation.insertReservation(req.body.reserva)
  res.status(200).json({ status: 'OK', result })
}

const updateReservation = async (req, res) => {
  const result = await Reservation.updateReservation(req.body.reserva)
  res.status(200).json({ status: 'OK', result })
}

const deleteReservation = async (req, res) => {
  const result = await Reservation.deleteReservation(req.params.id)
  res.status(200).json({ status: 'OK', result })
}

export default {
  getAllReservations,
  getReservationById,
  insertReservation,
  updateReservation,
  deleteReservation
}
