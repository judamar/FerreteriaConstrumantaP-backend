import Category from '../models/category.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'

const create = async (req, res) => {
  const category = req.body.category
  try {
    const result = await Category.create(category)
    result && result.affectedRows === 1 ? handleSuccess(res, 201, result) : handleBadRequest(res, 'Category not created.')
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const getAll = async (req, res) => {
  try {
    const categories = await Category.getAll()
    categories && categories.length > 0 ? handleSuccess(res, 200, categories) : handleNotFound(res, 'Categories not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.getById(id)
    category && category.length > 0 ? handleSuccess(res, 200, category) : handleNotFound(res, 'Category not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByName = async (req, res) => {
  const name = req.params.name
  try {
    const category = await Category.getByName(name)
    category && category.length > 0 ? handleSuccess(res, 200, category) : handleNotFound(res, 'Category not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const update = async (req, res) => {
  const id = req.params.id
  const category = req.body.category
  try {
    const result = await Category.update(id, category)
    result && result.affectedRows > 0 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Category not updated.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await Category.remove(id)
    result && result.affectedRows > 0 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Category not removed.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

export default {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove
}
