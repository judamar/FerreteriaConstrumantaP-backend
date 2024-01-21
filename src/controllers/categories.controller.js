import Category from '../models/category.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

const create = async (req, res) => {
  const category = req.body
  try {
    console.log(pc.bgGreen('CREATING CATEGORY'))
    console.log({ Category: category })
    const result = await Category.create(category)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('CATEGORY CREATED'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('CATEGORY NOT CREATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Category not created.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR CREATING CATEGORY'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL CATEGORIES'))
    const categories = await Category.getAll()
    if (categories && categories.length > 0) {
      console.log(pc.bgGreen('CATEGORIES FOUND'))
      handleSuccess(res, 200, categories)
    } else {
      console.log(pc.bgRed('CATEGORIES NOT FOUND'))
      handleNotFound(res, 'Categories not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR GETTING ALL CATEGORIES'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GETTING CATEGORY BY ID'))
    console.log({ ID: id })
    const category = await Category.getById(id)
    if (category && category.length > 0) {
      console.log(pc.bgGreen('CATEGORY FOUND'))
      handleSuccess(res, 200, category)
    } else {
      console.log(pc.bgRed('CATEGORY NOT FOUND'))
      handleNotFound(res, 'Category not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR GETTING CATEGORY BY ID'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getByName = async (req, res) => {
  const name = req.params.name
  try {
    console.log(pc.bgGreen('GETTING CATEGORY BY NAME'))
    console.log({ Name: name })
    const category = await Category.getByName(name)
    if (category && category.length > 0) {
      console.log(pc.bgGreen('CATEGORY FOUND'))
      handleSuccess(res, 200, category)
    } else {
      console.log(pc.bgRed('CATEGORY NOT FOUND'))
      handleNotFound(res, 'Category not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR GETTING CATEGORY BY NAME'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const update = async (req, res) => {
  const id = req.params.id
  const category = req.body.categoria
  try {
    console.log(pc.bgGreen('UPDATING CATEGORY'))
    console.log({ ID: id, Category: category })
    const result = await Category.update(id, category)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('CATEGORY UPDATED SUCCESSFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('CATEGORY NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Category not updated.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR UPDATING CATEGORY'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('REMOVING CATEGORY'))
    console.log({ ID: id })
    const result = await Category.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('CATEGORY DELETED SUCCESSFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('CATEGORY NOT DELETED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Category not deleted.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR REMOVING CATEGORY'))
    console.error({ Error: error.message })
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
