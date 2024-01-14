import Product from '../models/product.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'

const create = (req, res) => {
  try {
    const product = req.body.product
    const result = Product.create(product)
    result && result.affectedRows === 1 ? handleSuccess(res, 201, result) : handleBadRequest(res, 'Product not created.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getAll = async (req, res) => {
  try {
    const products = await Product.getAll()
    products && products.length > 0 ? handleSuccess(res, 200, products) : handleNotFound(res, 'Products not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id)
    product && product.length > 0 ? handleSuccess(res, 200, product) : handleNotFound(res, 'Product not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByName = async (req, res) => {
  const name = req.params.name
  try {
    const product = await Product.getByName(name)
    product && product.length > 0 ? handleSuccess(res, 200, product) : handleNotFound(res, 'Product not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByCategory = async (req, res) => {
  const category = req.params.category
  try {
    const products = await Product.getByCategory(category)
    products && products.length > 0 ? handleSuccess(res, 200, products) : handleNotFound(res, 'Products not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByKey = async (req, res) => {
  const key = req.params.key
  try {
    const products = await Product.getByKey(key)
    products && products.length > 0 ? handleSuccess(res, 200, products) : handleNotFound(res, 'Products not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const update = (req, res) => {
  try {
    const product = req.body.product
    const result = Product.update(req.params.id, product)
    result && result.affectedRows > 0 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Product not updated.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const remove = (req, res) => {
  try {
    const result = Product.remove(req.params.id)
    result && result.affectedRows === 1 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Product not deleted.')
  } catch (error) {
    handleBadRequest(res, error.message)
  }
}

export default {
  create,
  getAll,
  getById,
  getByName,
  getByCategory,
  getByKey,
  update,
  remove
}
