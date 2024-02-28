import Reservation from '../models/reservation.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

// create a reservation of some available
const create = async (req, res) => {
  const reservation = req.body
  try {
    console.log(pc.bgGreen('CREATING RESERVATION'))
    console.log({ Reservation: reservation })
    const result = await Reservation.create(reservation)
    if (result && (result.insertReservationResult.affectedRows > 0 || result.updateToolMachineResult.affectedRows >= 0)) {
      console.log(pc.bgGreen('RESERVATION CREATED'))
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('RESERVATION NOT CREATED'))
      handleBadRequest(res, 'No se pudo crear la reserva.')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al crear la reserva.')
  }
}

const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL RESERVATIONS'))
    const result = await Reservation.getAll()
    if (result && result.length > 0) {
      console.log(pc.bgGreen('RESERVATIONS FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('RESERVATIONS NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontraron las reservas.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING ALL RESERVATIONS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener las reservas.')
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GETTING RESERVATION'))
    console.log({ Id: id })
    const reservation = await Reservation.getById(id)
    if (reservation && reservation.length > 0) {
      console.log(pc.bgGreen('RESERVATION FOUND'))
      handleSuccess(res, 200, reservation)
    } else {
      console.log(pc.bgRed('RESERVATION NOT FOUND'))
      console.log({ Reservation: reservation })
      handleNotFound(res, 'No se encontro la reserva.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener la reservas.')
  }
}

const getByUserName = async (req, res) => {
  const userName = req.params.userName
  try {
    console.log(pc.bgGreen('GETTING RESERVATION'))
    console.log({ UserName: userName })
    const reservation = await Reservation.getByUserName(userName)
    if (reservation && reservation.length > 0) {
      console.log(pc.bgGreen('RESERVATION FOUND'))
      handleSuccess(res, 200, reservation)
    } else {
      console.log(pc.bgRed('RESERVATION NOT FOUND'))
      console.log({ Reservation: reservation })
      handleNotFound(res, 'No se encontro la reserva.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener la reserva.')
  }
}

const getByToolName = async (req, res) => {
  const toolName = req.params.herramienta
  try {
    console.log(pc.bgGreen('GETTING RESERVATION'))
    console.log({ ToolName: toolName })
    const reservation = await Reservation.getByToolName(toolName)
    if (reservation && reservation.length > 0) {
      console.log(pc.bgGreen('RESERVATION FOUND'))
      handleSuccess(res, 200, reservation)
    } else {
      console.log(pc.bgRed('RESERVATION NOT FOUND'))
      console.log({ Reservation: reservation })
      handleNotFound(res, 'No se encontro la reserva.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener la reserva.')
  }
}

const update = async (req, res) => {
  const reservation = req.body
  const id = req.params.id
  try {
    console.log(pc.bgGreen('UPDATING RESERVATION'))
    console.log({ Id: id })
    console.log({ Reservation: reservation })
    const result = await Reservation.update(id, reservation)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('RESERVATION UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('RESERVATION NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar la reserva.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar la reserva.')
  }
}

const updateState = async (req, res) => {
  const id = req.params.id
  const state = req.body.estado
  try {
    console.log(pc.bgGreen('UPDATING RESERVATION STATE'))
    console.log({ Id: id })
    console.log({ State: state })
    const result = await Reservation.updateState(id, state)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('RESERVATION STATE UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('RESERVATION STATE NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar el estado de la reserva.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING RESERVATION STATE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar el estado de la reserva.')
  }
}

const updateEndDate = async (req, res) => {
  const id = req.params.id
  const endDate = req.body.fecha_fin
  try {
    console.log(pc.bgGreen('UPDATING RESERVATION END DATE'))
    console.log({ Id: id })
    console.log({ EndDate: endDate })
    const result = await Reservation.updateEndDate(id, endDate)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('RESERVATION END DATE UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('RESERVATION END DATE NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar la fecha de entrega de la reserva.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING RESERVATION END DATE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar la fecha de entrega de la reserva.')
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
      handleBadRequest(res, 'No se pudo eliminar la reserva.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING RESERVATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al eliminar la reserva.')
  }
}

export default {
  create,
  getAll,
  getById,
  getByUserName,
  getByToolName,
  update,
  updateState,
  updateEndDate,
  remove
}
