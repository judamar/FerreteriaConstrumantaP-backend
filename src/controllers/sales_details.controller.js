import SalesDetail from '../models/sales_detail.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

// create sale detail
const create = async (req, res) => {
  const saleDetail = req.body
  try {
    console.log(pc.bgGreen('CREATING SALE DETAIL'))
    console.log({ SaleDetail: saleDetail })
    const result = await SalesDetail.create(saleDetail)
    if (result && (result.insertSaleDetail.affectedRows > 0 && result.updateProductResult.affectedRows >= 0)) {
      console.log(pc.bgGreen('SALE DETAIL CREATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('SALE DETAIL NOT CREATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo crear el detalle de venta.')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING SALE DETAIL FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al crear el detalle de venta.')
  }
}

// get all sale details
const getAll = async (req, res) => {
  try {
    console.log(pc.green('GETTING ALL SALE DETAILS'))
    const result = await SalesDetail.getAll()
    if (result && result.length > 0) {
      console.log(pc.green('SALE DETAILS FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.red('SALE DETAILS NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontraron detalles de venta.')
    }
  } catch (error) {
    console.log(pc.red('GETTING ALL SALE DETAILS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener los detalles de venta.')
  }
}

// get all sale details by id
const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.green('GETTING SALE DETAIL'))
    console.log({ Id: id })
    const result = await SalesDetail.getById(id)
    if (result && result.length > 0) {
      console.log(pc.green('SALE DETAIL FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.red('SALE DETAIL NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontró el detalle de venta.')
    }
  } catch (error) {
    console.log(pc.red('GETTING SALE DETAIL FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener el detalle de venta.')
  }
}

// get all sale details by sale id
const getBySaleId = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.green('GETTING SALE DETAIL'))
    console.log({ Id: id })
    const result = await SalesDetail.getBySaleId(id)
    if (result && result.length > 0) {
      console.log(pc.green('SALE DETAIL FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.red('SALE DETAIL NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No se encontró el detalle de venta.')
    }
  } catch (error) {
    console.log(pc.red('GETTING SALE DETAIL FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener el detalle de venta.')
  }
}

// update sale detail
const update = async (req, res) => {
  const saleDetail = req.body
  const id = req.params.id
  try {
    console.log(pc.bgGreen('UPDATING SALE DETAIL'))
    console.log({ SaleDetail: saleDetail })
    console.log({ Id: id })
    const result = await SalesDetail.update(id, saleDetail)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SALE DETAIL UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALE DETAIL NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo actualizar el detalle de venta.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING SALE DETAIL FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar el detalle de venta.')
  }
}

// remove sale detail
const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING SALE DETAIL'))
    console.log({ Id: id })
    const result = await SalesDetail.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SALE DETAIL DELETED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SALE DETAIL NOT DELETED'))
      console.log({ Result: result })
      handleBadRequest(res, 'No se pudo eliminar el detalle de venta.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING SALE DETAIL FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al eliminar el detalle de venta.')
  }
}

export default {
  create,
  getAll,
  getById,
  getBySaleId,
  update,
  remove
}
