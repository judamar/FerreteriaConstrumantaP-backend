import SalesStatus from '../models/sales_status.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

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
      handleBadRequest(res, 'Sales status not created.')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING SALES STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

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
      handleNotFound(res, 'No sales statuses found.')
    }
  } catch (error) {
    console.log(pc.red('GETTING ALL SALES STATUSES FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

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
      handleNotFound(res, 'No sales status found.')
    }
  } catch (error) {
    console.log(pc.red('GETTING SALES STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

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
      handleBadRequest(res, 'Sales status not updated.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING SALES STATUS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

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
      handleBadRequest(res, 'Sales status not deleted.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING SALES STATUS FAILED'))
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
