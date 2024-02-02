import Sales from '../models/sales.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

const create = async (req, res) => {
  const sale = req.body
  try {
    console.log(pc.bgGreen('CREATING SALE'))
    console.log({ Sale: sale })
    const result = await Sales.create(sale)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SALE CREATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('CREATING SALE FAILED'))
      console.log({ Result: result })
      handleServerError(res, 'Error creating sale')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING SALE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL SALES'))
    const result = await Sales.getAll()
    if (result && result.length > 0) {
      console.log(pc.bgGreen('SALES FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALES NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No sales found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING ALL SALES FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GETTING SALE'))
    console.log({ Id: id })
    const result = await Sales.getById(id)
    if (result && result.length > 0) {
      console.log(pc.bgGreen('SALE FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALE NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No sale found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING SALE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getByUserName = async (req, res) => {
  const userName = req.params.nombre
  try {
    console.log(pc.bgGreen('GETTING SALE'))
    console.log({ UserName: userName })
    const result = await Sales.getByUserName(userName)
    if (result && result.length > 0) {
      console.log(pc.bgGreen('SALE FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALE NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No sale found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING SALE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const update = async (req, res) => {
  const sale = req.body
  const id = req.params.id
  try {
    console.log(pc.bgGreen('UPDATING SALE'))
    console.log({ Sale: sale })
    console.log({ Id: id })
    const result = await Sales.update(id, sale)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SALE UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALE NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Error updating sale.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING SALE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING SALE'))
    console.log({ Id: id })
    const result = await Sales.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SALE DELETED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALE NOT DELETED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Error deleting sale.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING SALE FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

export default {
  create,
  getAll,
  getById,
  getByUserName,
  update,
  remove
}
