import ToolMachine from '../models/tool_machine.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

// create tool machine
const create = async (req, res) => {
  try {
    const toolMachine = {
      nombre_articulo: req.body.nombre_articulo,
      descripcion: req.body.descripcion,
      precio_alquiler: req.body.precio_alquiler,
      cantidad_disponible: req.body.cantidad_disponible,
      estados_herramientas_maquinas_id: req.body.estados_herramientas_maquinas_id,
      image: req.file.filename
    }
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
      handleBadRequest(res, 'No se pudo crear la herramienta.')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING TOOL - MACHINE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al crear la herramienta.')
  }
}

// update tool machine
const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL TOOL - MACHINES'))
    const result = await ToolMachine.getAll()
    if (result && result.length > 0) {
      console.log(pc.bgGreen('TOOL - MACHINES FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINES NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontraron herramientas.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING ALL TOOL - MACHINES FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener las herramientas.')
  }
}

// get tool machine by id
const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GETTING TOOL - MACHINE BY ID'))
    console.log({ ID: id })
    const result = await ToolMachine.getById(id)
    if (result && result.length > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontró la herramienta.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING TOOL - MACHINE BY ID FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener la herramienta.')
  }
}

// get tool machine by name (search)
const getByName = async (req, res) => {
  const name = req.params.name
  try {
    console.log(pc.bgGreen('GETTING TOOL - MACHINE BY NAME'))
    console.log({ Name: name })
    const result = await ToolMachine.getByName(name)
    if (result && result.length > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontró la herramienta.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING TOOL - MACHINE BY NAME FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener la herramienta.')
  }
}

// update tool machine
const update = async (req, res) => {
  const id = req.params.id
  const toolMachine = {
    nombre_articulo: req.body.nombre_articulo,
    descripcion: req.body.descripcion,
    precio_alquiler: req.body.precio_alquiler,
    cantidad_disponible: req.body.cantidad_disponible,
    estados_herramientas_maquinas_id: req.body.estados_herramientas_maquinas_id
  }
  try {
    console.log(pc.bgGreen('UPDATING TOOL - MACHINE'))
    console.log({ ID: id })
    console.log({ ToolMachine: toolMachine })
    const result = await ToolMachine.update(id, toolMachine)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE UPDATED'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar la herramienta.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING TOOL - MACHINE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar la herramienta.')
  }
}

// update image of tool machine
const updateImage = async (req, res) => {
  try {
    const id = req.params.id
    const image = req.file.filename
    const img = `src/images/public/${image}`
    console.log(pc.bgGreen('UPDATING TOOL - MACHINE IMAGE'))
    console.log({ ID: id })
    console.log({ Image: img })
    const result = await ToolMachine.updateImage(id, img)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE IMAGE UPDATED'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE IMAGE NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar la imagen de la herramienta.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING TOOL - MACHINE IMAGE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar la imagen de la herramienta.')
  }
}

// update state (status)
const updateState = async (req, res) => {
  const id = req.params.id
  const state = req.body.estado
  try {
    console.log(pc.bgGreen('UPDATING TOOL - MACHINE STATE'))
    console.log({ ID: id })
    console.log({ State: state })
    const result = await ToolMachine.updateState(id, state)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('TOOL - MACHINE STATE UPDATED'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('TOOL - MACHINE STATE NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar el estado de la herramienta.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING TOOL - MACHINE STATE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar el estado de la herramienta.')
  }
}

// remove tool machine
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
      handleBadRequest(res, 'No se pudo elinar la herramienta.')
    }
  } catch (error) {
    console.log(pc.bgRed('REMOVING TOOL - MACHINE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al eliminar la herramienta.')
  }
}

export default {
  create,
  getAll,
  getById,
  getByName,
  update,
  updateImage,
  updateState,
  remove
}
