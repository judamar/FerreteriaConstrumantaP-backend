import User from '../models/user.model.js'
import { generateToken } from '../middlewares/authJWT.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest, handleUnauthorized } from '../utils/handles.js'

const signup = async (req, res) => {
  const user = req.body.user
  try {
    const result = await User.create(user)
    result && result.affectedRows === 1 ? handleSuccess(res, 201, result) : handleBadRequest(res, 'User not created.')
  } catch (error) {
    error.message.includes('cannot be null') ? handleBadRequest(res, `Missing or invalid value for field: ${/Column '([^']*)'/.exec(error.message)[1] || 'Unknown'}`) : handleServerError(res, error.message)
  }
}

const login = async (req, res) => {
  const { cedula, password } = req.body.user
  try {
    const user = await User.authenticate(cedula, password)
    if (user) {
      const token = generateToken(user)
      handleSuccess(res, 200, { token })
    } else {
      handleUnauthorized(res, 'Invalid credentials')
    }
  } catch (error) {
    handleServerError(res, error.message)
  }
}

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

const update = async (req, res) => {
  const id = req.params.id
  const user = req.body.user
  try {
    const result = await User.update(id, user)
    result && result.affectedRows > 0 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'User not updated.')
  } catch (error) {
    error.message.includes('cannot be null') ? handleBadRequest(res, `Missing or invalid value for field: ${/Column '([^']*)'/.exec(error.message)[1] || 'Unknown'}`) : handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await User.remove(id)
    result && result.affectedRows === 1 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'User not deleted.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

export default {
  signup,
  login,
  getAll,
  getById,
  getByCedula,
  update,
  remove
}
