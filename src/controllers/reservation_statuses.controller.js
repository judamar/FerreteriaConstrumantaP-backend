import ReservationStatus from '../models/reservation_status.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

// create a status for reservations
const create = async (req, res) => {
  const reservationStatus = req.body
  try {
    console.log(pc.bgGreen('CREATING RESERVATION STATUS'))
    console.log({ ReservationStatus: reservationStatus })
    const result = await ReservationStatus.create(reservationStatus)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('RESERVATION STATUS CREATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('RESERVATION STATUS NOT CREATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Reservation status not created.')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING RESERVATION STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get al statuses
const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING RESERVATION STATUSES'))
    const reservationStatuses = await ReservationStatus.getAll()
    if (reservationStatuses && reservationStatuses.length > 0) {
      console.log(pc.bgGreen('RESERVATION STATUSES FOUND'))
      handleSuccess(res, 200, reservationStatuses)
    } else {
      console.log(pc.bgRed('RESERVATION STATUSES NOT FOUND'))
      console.log({ ReservationStatuses: reservationStatuses })
      handleNotFound(res, 'Reservation statuses not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING RESERVATION STATUSES FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get status by id
const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GETTING RESERVATION STATUS'))
    console.log({ Id: id })
    const reservationStatus = await ReservationStatus.getById(id)
    if (reservationStatus && reservationStatus.length > 0) {
      console.log(pc.bgGreen('RESERVATION STATUS FOUND'))
      handleSuccess(res, 200, reservationStatus)
    } else {
      console.log(pc.bgRed('RESERVATION STATUS NOT FOUND'))
      console.log({ ReservationStatus: reservationStatus })
      handleNotFound(res, 'Reservation status not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING RESERVATION STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// update status (update all fields)
const update = async (req, res) => {
  const id = req.params.id
  const reservationStatus = req.body
  try {
    console.log(pc.bgGreen('UPDATING RESERVATION STATUS'))
    console.log({ ReservationStatus: reservationStatus })
    console.log({ Id: id })
    const result = await ReservationStatus.update(id, reservationStatus)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('RESERVATION STATUS UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('RESERVATION STATUS NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Reservation status not updated.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING RESERVATION STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// remove status
const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING RESERVATION STATUS'))
    console.log({ Id: id })
    const result = await ReservationStatus.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('RESERVATION STATUS DELETED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('RESERVATION STATUS NOT DELETED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Reservation status not deleted.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING RESERVATION STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

export default {
  create,
  getAll,
  getById,
  update,
  remove
}
