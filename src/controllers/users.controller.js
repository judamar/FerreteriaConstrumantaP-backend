import User from '../models/user.model.js'
import { generateToken } from '../middlewares/authJWT.js'
import password from '../utils/password.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest, handleUnauthorized } from '../utils/handles.js'
import pc from 'picocolors'
import jwt from 'jsonwebtoken'

// signup user
const signup = async (req, res) => { // x-www-form-urlencoded
  if (!req.body.password || req.body.password.length < 8) {
    handleBadRequest(res, 'La contraseña debe ser minimo de 8 caracteres.')
    console.log(pc.bgRed('SIGNUP USER FAILED, INVALID PASSWORD'))
    return
  }
  const user = {
    cedula: req.body.cedula,
    nombre_completo: req.body.nombre_completo,
    correo_electronico: req.body.correo_electronico,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    password: await password.hashPassword(req.body.password) // hashea la contraseña
  }
  try {
    console.log(pc.bgGreen('SIGNUP USER'))
    console.log({ User: user })
    const result = await User.create(user)
    const { password, ...loggableUser } = user
    console.log({ User: loggableUser })
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SIGNUP USER SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, user)
    } else {
      console.log(pc.bgRed('SIGNUP USER FAILED'))
      console.log({ Result: result })
      handleServerError(res, 'No se pudo crear el usuario.')
    }
  } catch (error) {
    console.log(pc.bgRed('SIGNUP USER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al crear el usuario.')
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
      const decoded = jwt.decode(token)
      handleSuccess(res, 200, { mesage: 'Inicio de sesión correcto.', token, user: decoded })
    } else {
      console.log(pc.bgRed('LOGIN USER FAILED, INVALID CREDENTIALS'))
      handleUnauthorized(res, 'Credenciales invalidas.')
    }
  } catch (error) {
    console.log(pc.bgRed('LOGIN USER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error en el inicio de sesión.')
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
      handleNotFound(res, 'No se encontraron usuarios.')
    }
  } catch (error) {
    console.log(pc.bgRed('GET ALL USERS FAILED'))
    console.error({ Error: error.message })
    handleBadRequest(res, 'Error al obtener los usuarios.')
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
      handleNotFound(res, 'No se encontró el usuario.')
    }
  } catch (error) {
    console.log(pc.bgRed('GET USER BY ID FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener el usuario.')
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
      handleNotFound(res, 'No se encontró el usuario.')
    }
  } catch (error) {
    console.log(pc.bgRed('GET USER BY CEDULA FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al obtener el usuario.')
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
    direccion: req.body.direccion
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
      handleServerError(res, 'No se pudo actualizar el usuario.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATE USER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al actualizar el usuario.')
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
      handleSuccess(res, 200, { message: 'Contraseña actualizada satisfactoriamente.' })
    } else {
      console.log(pc.bgRed('UPDATE PASSWORD FAILED'))
      console.log({ Result: result })
      handleServerError(res, 'No se pudo cambiar la contraseña.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATE PASSWORD FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al cambiar la contraseña.')
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
      handleSuccess(res, 200, { message: 'Usuario eliminado satisfactoriamente.' })
    } else {
      console.log(pc.bgRed('DELETE USER FAILED'))
      console.log({ Result: result })
      handleServerError(res, 'No se pudo eliminar el usuario.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETE USER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, 'Error al eliminar el usuario.')
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
