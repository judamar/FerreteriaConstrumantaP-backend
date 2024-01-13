import Product from '../models/product.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'

const getAll = async (req, res) => {
  try {
    const products = await Product.getAll()
    products ? handleSuccess(res, 200, products) : handleNotFound(res, 'Products not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id)
    product ? handleSuccess(res, 200, product) : handleNotFound(res, 'Product not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByName = async (req, res) => {
  const name = req.params.name
  try {
    const product = await Product.getByName(name)
    product ? handleSuccess(res, 200, product) : handleNotFound(res, 'Product not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByCategory = async (req, res) => {
  const category = req.params.category
  try {
    const products = await Product.getByCategory(category)
    products ? handleSuccess(res, 200, products) : handleNotFound(res, 'Products not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const create = (req, res) => {
  try {
    const product = req.body.product
    const result = Product.create(product)
    result ? handleSuccess(res, 201, result) : handleBadRequest(res, 'Product not created.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const update = (req, res) => {
  try {
    const product = req.body.product
    const result = Product.update(req.params.id, product)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Product not updated.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const remove = (req, res) => {
  try {
    const result = Product.remove(req.params.id)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Product not deleted.')
  } catch (error) {
    handleBadRequest(res, error.message)
  }
}

export default {
  getAll,
  getById,
  getByName,
  getByCategory,
  create,
  update,
  remove
}
