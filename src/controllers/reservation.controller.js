import Reservation from '../models/reservation.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

const create = async (req, res) => {
  try {
    console.log(pc.green('CREATING RESERVATION'))
    const result = await Reservation.create(req.body)
    if (result) {
      console.log(pc.green('RESERVATION CREATED'))
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.red('RESERVATION NOT CREATED'))
      handleBadRequest(res, 'Reservation not created.')
    }
  } catch (error) {
    console.log(pc.red('CREATING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getAll = async (req, res) => {
  try {
    console.log(pc.green('GETTING ALL RESERVATIONS'))
    const result = await Reservation.getAll()
    if (result && result.length > 0) {
      console.log(pc.green('RESERVATIONS FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.red('RESERVATIONS NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'Reservations not found.')
    }
  } catch (error) {
    console.log(pc.red('GETTING ALL RESERVATIONS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params
    console.log(pc.green('GETTING RESERVATION'))
    const reservation = await Reservation.getById(id)
    if (reservation && reservation.length > 0) {
      console.log(pc.green('RESERVATION FOUND'))
      handleSuccess(res, 200, reservation)
    } else {
      console.log(pc.red('RESERVATION NOT FOUND'))
      console.log({ Reservation: reservation })
      handleNotFound(res, 'Reservation not found.')
    }
  } catch (error) {
    console.log(pc.red('GETTING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    console.log(pc.bgGreen('UPDATING RESERVATION'))
    const result = await Reservation.update(id, req.body)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('RESERVATION UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('RESERVATION NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Reservation not updated.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING RESERVATION'))
    console.log({ Id: id })
    const result = await Reservation.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('RESERVATION DELETED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('RESERVATION NOT DELETED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Reservation not deleted.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING RESERVATION FAILED'))
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
