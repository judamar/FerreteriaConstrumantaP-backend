import SalesStatus from '../models/sales_status.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

// create status for sales
const create = async (req, res) => {
  const salesStatus = req.body
  try {
    console.log(pc.bgGreen('CREATING SALES STATUS'))
    console.log({ SalesSatatus: salesStatus })
    const result = await SalesStatus.create(salesStatus)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SALES STATUS CREATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('SALES STATUS CREATION FAILED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo crear el estado de venta.')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING SALES STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al crear el estado de venta.')
  }
}

// get all statuses
const getAll = async (req, res) => {
  try {
    console.log(pc.green('GETTING ALL SALES STATUSES'))
    const result = await SalesStatus.getAll()
    if (result && result.length > 0) {
      console.log(pc.green('SALES STATUSES FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.red('SALES STATUSES NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontraron estados de venta.')
    }
  } catch (error) {
    console.log(pc.red('GETTING ALL SALES STATUSES FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener los estados de venta.')
  }
}

// get status by id
const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.green('GETTING SALES STATUS'))
    console.log({ Id: id })
    const result = await SalesStatus.getById(id)
    if (result && result.length > 0) {
      console.log(pc.green('SALES STATUS FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.red('SALES STATUS NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontró el estado de venta.')
    }
  } catch (error) {
    console.log(pc.red('GETTING SALES STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al encontrar el estado de venta.')
  }
}

// update status
const update = async (req, res) => {
  const salesStatus = req.body
  const id = req.params.id
  try {
    console.log(pc.bgGreen('UPDATING SALES STATUS'))
    console.log({ SalesStatus: salesStatus })
    console.log({ Id: id })
    const result = await SalesStatus.update(id, salesStatus)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SALES STATUS UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALES STATUS NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar el estado de venta.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING SALES STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar el estado de venta.')
  }
}

// remove status
const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING SALES STATUS'))
    console.log({ Id: id })
    const result = await SalesStatus.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SALES STATUS DELETED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALES STATUS NOT DELETED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo eliminar el estado de venta.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING SALES STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al eliminar el estado de venta.')
  }
}

export default {
  create,
  getAll,
  getById,
  update,
  remove
}
