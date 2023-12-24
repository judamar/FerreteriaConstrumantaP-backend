import ReservationStatus from '../models/reservation_status.model.js'

const getAllReservationStatuses = async (req, res) => {
  try {
    const result = await ReservationStatus.getAllReservationStatus()
    res.json({ status: 'OK', reservation_status: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { getAllReservationStatuses }
