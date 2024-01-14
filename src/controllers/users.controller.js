import User from '../models/user.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'

const getAll = async (req, res) => {
  try {
    const users = await User.getAll()
    users && users.length > 0 ? handleSuccess(res, 200, users) : handleNotFound(res, 'Users not found.')
  } catch (error) {
    handleBadRequest(res, error.message)
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.getById(id)
    user && user.length > 0 ? handleSuccess(res, 200, user) : handleNotFound(res, 'User not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByCedula = async (req, res) => {
  const cedula = req.params.cedula
  try {
    const user = await User.getByCedula(cedula)
    user && user.length > 0 ? handleSuccess(res, 200, user) : handleNotFound(res, 'User not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const insert = async (req, res) => {
  const user = req.body.user
  try {
    const result = await User.create(user)
    result && result.affectedRows === 1 ? handleSuccess(res, 201, result) : handleBadRequest(res, 'User not created.')
  } catch (error) {
    error.message.includes('cannot be null') ? handleBadRequest(res, `Missing or invalid value for field: ${/Column '([^']*)'/.exec(error.message)[1] || 'Unknown'}`) : handleServerError(res, error.message)
  }
}

const updateById = async (req, res) => {
  const id = req.params.id
  const user = req.body.user
  try {
    const result = await User.updateById(id, user)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'User not updated.')
  } catch (error) {
    return error.message.includes('cannot be null') ? handleBadRequest(res, `Missing or invalid value for field: ${/Column '([^']*)'/.exec(error.message)[1] || 'Unknown'}`) : handleServerError(res, error.message)
  }
}

const updateByCedula = async (req, res) => {
  const cedula = req.params.cedula
  const user = req.body.user
  try {
    const result = await User.updateByCedula(cedula, user)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'User not updated.')
  } catch (error) {
    return error.message.includes('cannot be null') ? handleBadRequest(res, `Missing or invalid value for field: ${/Column '([^']*)'/.exec(error.message)[1] || 'Unknown'}`) : handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await User.delete(id)
    result && result.affectedRows === 1 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'User not deleted.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

export default {
  getAll,
  getById,
  getByCedula,
  insert,
  updateById,
  updateByCedula,
  remove
}
