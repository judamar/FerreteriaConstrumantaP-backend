import ToolMachineStatus from '../models/tool_machine_status.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

// create tool machine status
const create = async (req, res) => {
  const toolsMachinesStatus = req.body
  try {
    console.log(pc.bgGreen('CREATING TOOL MACHINE STATUS'))
    console.log({ ToolsMachinesStatus: toolsMachinesStatus })
    const result = await ToolMachineStatus.create(toolsMachinesStatus)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL MACHINE STATUS CREATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('CREATING TOOL MACHINE STATUS FAILED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo crear el estado de herramientas.')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING TOOL MACHINE STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al crear el estado de herramientas.')
  }
}

// get all statuses
const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL TOOL MACHINE STATUSES'))
    const result = await ToolMachineStatus.getAll()
    if (result && result.length > 0) {
      console.log(pc.bgGreen('TOOL MACHINE STATUSES FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL MACHINE STATUSES NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontraron estados de herramientas.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING ALL TOOL MACHINE STATUSES FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener los estados de herramientas.')
  }
}

// get status by id
const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GETTING TOOL MACHINE STATUS'))
    console.log({ Id: id })
    const result = await ToolMachineStatus.getById(id)
    if (result && result.length > 0) {
      console.log(pc.bgGreen('TOOL MACHINE STATUS FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL MACHINE STATUS NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontró el estado de herramientas.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING TOOL MACHINE STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener el estado de herramientas.')
  }
}

// update status
const update = async (req, res) => {
  const id = req.params.id
  const toolsMachinesStatus = req.body
  try {
    console.log(pc.bgGreen('UPDATING TOOL MACHINE STATUS'))
    console.log({ ToolsMachinesStatus: toolsMachinesStatus })
    console.log({ Id: id })
    const result = await ToolMachineStatus.update(id, toolsMachinesStatus)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL MACHINE STATUS UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL MACHINE STATUS NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar el estado de herramientas.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING TOOL MACHINE STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar el estado de herramientas.')
  }
}

// remove status
const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING TOOL MACHINE STATUS'))
    console.log({ Id: id })
    const result = await ToolMachineStatus.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL MACHINE STATUS DELETED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL MACHINE STATUS NOT DELETED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo eliminar el estado de herramientas.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING TOOL MACHINE STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al eliminar el estado de herramientas.')
  }
}

export default {
  create,
  getAll,
  getById,
  update,
  remove
}
