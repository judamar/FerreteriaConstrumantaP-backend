import Category from '../models/category.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'

const getAll = async (req, res) => {
  try {
    const categories = await Category.getAll()
    categories ? handleSuccess(res, 200, categories) : handleNotFound(res, 'Categories not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.getById(id)
    category ? handleSuccess(res, 200, category) : handleNotFound(res, 'Category not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByName = async (req, res) => {
  const name = req.params.name
  try {
    const category = await Category.getByName(name)
    category ? handleSuccess(res, 200, category) : handleNotFound(res, 'Category not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const insert = async (req, res) => {
  const category = req.body.category
  try {
    const result = await Category.create(category)
    result ? handleSuccess(res, 201, result) : handleBadRequest(res, 'Category not created.')
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const update = async (req, res) => {
  const id = req.params.id
  const category = req.body.category
  try {
    const result = await Category.update(id, category)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Category not updated.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await Category.remove(id)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Category not removed.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

export default {
  getAll,
  getById,
  getByName,
  insert,
  update,
  remove
}
