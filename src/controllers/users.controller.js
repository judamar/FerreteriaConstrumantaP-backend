import User from '../models/user.model.js'
import { generateToken } from '../middlewares/authJWT.js'
import password from '../utils/password.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest, handleUnauthorized } from '../utils/handles.js'
import pc from 'picocolors'

// signup user
const signup = async (req, res) => { // x-www-form-urlencoded
  const user = {
    cedula: req.body.cedula,
    nombre_completo: req.body.nombre_completo,
    correo_electronico: req.body.correo_electronico,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    password: await password.hashPassword(req.body.password),
    es_admin: req.body.es_admin
  }
  try {
    console.log(pc.bgGreen('SIGNUP USER'))
    const result = await User.create(user)
    const { password, ...loggableUser } = user
    console.log({ User: loggableUser })
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SIGNUP USER SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, { message: 'User created successfully' })
    } else {
      console.log(pc.bgRed('SIGNUP USER FAILED'))
      console.log({ Result: result })
      handleServerError(res, 'User creation failed')
    }
  } catch (error) {
    console.log(pc.bgRed('SIGNUP USER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// login user
const login = async (req, res) => { // x-www-form-urlencoded or raw(json)
  const { cedula, password } = req.body
  try {
    console.log(pc.bgGreen('LOGIN USER'))
    const user = await User.authenticate(cedula, password)
    if (user) {
      const token = generateToken(user)
      console.log(pc.bgGreen('LOGIN USER SUCCESFULLY'))
      handleSuccess(res, 200, { token })
    } else {
      console.log(pc.bgRed('LOGIN USER FAILED, INVALID CREDENTIALS'))
      handleUnauthorized(res, 'Invalid credentials')
    }
  } catch (error) {
    console.log(pc.bgRed('LOGIN USER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get all users
const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GET ALL USERS'))
    const users = await User.getAll()
    if (users && users.length > 0) {
      console.log(pc.bgGreen('GET ALL USERS SUCCESFULLY'))
      handleSuccess(res, 200, users)
    } else {
      console.log(pc.bgRed('GET ALL USERS FAILED, NOT FOUND'))
      handleNotFound(res, 'Users not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GET ALL USERS FAILED'))
    console.error({ Error: error.message })
    handleBadRequest(res, error.message)
  }
}

// get user by id
const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GET USER BY ID'))
    const user = await User.getById(id)
    if (user && user.length > 0) {
      console.log(pc.bgGreen('GET USER BY ID SUCCESFULLY'))
      handleSuccess(res, 200, user)
    } else {
      console.log(pc.bgRed('GET USER BY ID FAILED, NOT FOUND'))
      handleNotFound(res, 'User not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GET USER BY ID FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get user by cedula
const getByCedula = async (req, res) => {
  const cedula = req.params.cedula
  try {
    console.log(pc.bgGreen('GET USER BY CEDULA'))
    const user = await User.getByCedula(cedula)
    if (user && user.length > 0) {
      console.log(pc.bgGreen('GET USER BY CEDULA SUCCESFULLY'))
      handleSuccess(res, 200, user)
    } else {
      console.log(pc.bgRed('GET USER BY CEDULA FAILED, NOT FOUND'))
      handleNotFound(res, 'User not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GET USER BY CEDULA FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// update user
const update = async (req, res) => {
  const id = req.params.id
  const user = {
    cedula: req.body.cedula,
    nombre_completo: req.body.nombre_completo,
    correo_electronico: req.body.correo_electronico,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    es_admin: req.body.es_admin
  }
  try {
    console.log(pc.bgGreen('UPDATE USER'))
    const result = await User.update(id, user)
    console.log({ User: user })
    console.log({ ID: id })
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('UPDATE USER SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, { message: 'User updated successfully' })
    } else {
      console.log(pc.bgRed('UPDATE USER FAILED'))
      console.log({ Result: result })
      handleServerError(res, 'User update failed')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATE USER FAILED'))
    console.error({ Error: error.message })
    error.message.includes('cannot be null') ? handleBadRequest(res, `Missing or invalid value for field: ${/Column '([^']*)'/.exec(error.message)[1] || 'Unknown'}`) : handleServerError(res, error.message)
  }
}

// update password (change)
const updatePassword = async (req, res) => {
  const id = req.params.id
  const passwordHashed = await password.hashPassword(req.body.password)
  try {
    console.log(pc.bgGreen('UPDATE PASSWORD'))
    console.log({ ID: id })
    const result = await User.updatePassword(id, passwordHashed)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('UPDATE PASSWORD SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, { message: 'Password updated successfully' })
    } else {
      console.log(pc.bgRed('UPDATE PASSWORD FAILED'))
      console.log({ Result: result })
      handleServerError(res, 'Password update failed')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATE PASSWORD FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// remove user
const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETE USER'))
    console.log({ ID: id })
    const result = await User.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('DELETE USER SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, { message: 'User deleted successfully' })
    } else {
      console.log(pc.bgRed('DELETE USER FAILED'))
      console.log({ Result: result })
      handleServerError(res, 'User delete failed')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETE USER FAILED'))
    console.error({ Error: error.message })
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
  updatePassword,
  remove
}
