import ToolMachine from '../models/tool_machine.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

const create = async (req, res) => {
  const toolMachine = {
    nombre_articulo: req.body.nombre_articulo,
    descripcion: req.body.descripcion,
    precio_alquiler: req.body.precio_alquiler,
    cantidad_disponible: req.body.cantidad_disponible,
    estado_herramienta_maquina: req.body.estado_herramienta_maquina,
    image: req.file.filename
  }
  try {
    console.log(pc.bgGreen('CREATING TOOL - MACHINE'))
    console.log({ Body: toolMachine })
    const image = `src/images/public/${toolMachine.image}`
    const result = await ToolMachine.create(toolMachine, image)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE CREATED'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE NOT CREATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Tool - machine not created')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING TOOL - MACHINE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL TOOL - MACHINES'))
    const result = await ToolMachine.getAll()
    if (result && result.length > 0) {
      console.log(pc.bgGreen('TOOL - MACHINES FOUND'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINES NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'Tool - machines not found')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING ALL TOOL - MACHINES FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING TOOL - MACHINE BY ID'))
    const result = await ToolMachine.getById(req.params.id)
    if (result && result.length > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE FOUND'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'Tool - machine not found')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING TOOL - MACHINE BY ID FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const update = async (req, res) => {
  try {
    console.log(pc.bgGreen('UPDATING TOOL - MACHINE'))
    const result = await ToolMachine.update(req.body, req.params.id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE UPDATED'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Tool - machine not updated')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING TOOL - MACHINE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  try {
    console.log(pc.bgGreen('REMOVING TOOL - MACHINE'))
    const result = await ToolMachine.remove(req.params.id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE REMOVED'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE NOT REMOVED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Tool - machine not removed')
    }
  } catch (error) {
    console.log(pc.bgRed('REMOVING TOOL - MACHINE FAILED'))
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
