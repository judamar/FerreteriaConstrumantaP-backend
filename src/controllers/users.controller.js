import User from '../models/user.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'

const getAll = async (req, res) => {
  try {
    const users = await User.getAll()
    users ? handleSuccess(res, 200, users) : handleNotFound(res, 'Users not found.')
  } catch (error) {
    handleBadRequest(res, error.message)
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.getById(id)
    user ? handleSuccess(res, 200, user) : handleNotFound(res, 'User not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByCedula = async (req, res) => {
  const cedula = req.params.cedula
  try {
    const user = await User.getByCedula(cedula)
    user ? handleSuccess(res, 200, user) : handleNotFound(res, 'User not found.')
  } catch (error) {
    res.status(404).json({ status: 'ERROR', error: error.message })
  }
}

const insert = async (req, res) => {
  const user = req.body.user
  try {
    const result = await User.create(user)
    result ? handleSuccess(res, 201, result) : handleBadRequest(res, 'User not created.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const updateById = async (req, res) => {
  const id = req.params.id
  const user = req.body.user
  try {
    const result = await User.updateById(id, user)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'User not updated.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const updateByCedula = async (req, res) => {
  const cedula = req.params.cedula
  const user = req.body.user
  try {
    const result = await User.updateByCedula(cedula, user)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'User not updated.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await User.delete(id)
    result ? handleSuccess(res, 200, result) : handleBadRequest(res, 'User not deleted.')
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
