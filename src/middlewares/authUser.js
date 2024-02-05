import jwt from 'jsonwebtoken'
import 'dotenv/config'
import pc from 'picocolors'
import { handleUnauthorized, handleExpiredToken, handleNotFound, handleServerError } from '../utils/handles.js'
import User from '../models/user.model.js'

const secretKey = process.env.JWT_SECRET_KEY

/**
 * Middleware function to authenticate users.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const authUser = (req, res, next) => {
  console.log(pc.bgBlue('AUTHENTICATING USER'))
  const accessToken = req.headers.authorization
  if (!accessToken) {
    handleUnauthorized(res, 'No token provided.')
    console.log(pc.bgRed('USER NOT AUTHENTICATED, NO TOKEN PROVIDED'))
    return
  }
  try {
    jwt.verify(accessToken, secretKey, async (err, user) => {
      if (err) {
        handleExpiredToken(res, err.message)
      } else {
        const decoded = jwt.decode(accessToken)
        req.id = decoded.id
        req.esAdmin = decoded.esAdmin
        const user = await User.getById(req.id)
        if (!user) {
          handleNotFound(res, 'User not found.')
          console.log(pc.bgRed('USER NOT AUTHENTICATED, USER NOT FOUND'))
        }
        console.log(pc.bgBlue('USER AUTHENTICATED SUCCESFULLY'))
        next()
      }
    })
  } catch (error) {
    console.log(pc.bgRed('USER NOT AUTHENTICATED, ERROR'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

/**
 * Middleware function to check if the user is an admin.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */

const authAdmin = async (req, res, next) => {
  console.log(pc.bgBlue('CHECKING IF USER IS AN ADMIN'))
  try {
    const user = await User.getById(req.id)
    if (!user) {
      handleNotFound(res, 'User not found.')
      console.log(pc.bgRed('USER NOT AUTHENTICATED, USER NOT FOUND'))
    }
    if (req.esAdmin === 1) {
      console.log(pc.bgBlue('USER IS AN ADMIN'))
      console.log(pc.bgBlue('USER AUTHENTICATED SUCCESFULLY'))
      next()
    } else {
      handleUnauthorized(res, 'You are not authorized to perform this action.')
      console.log(pc.bgRed('USER NOT AUTHENTICATED, NOT AN ADMIN'))
    }
  } catch (error) {
    console.log(pc.bgRed('USER NOT AUTHENTICATED, ERROR'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

export {
  authUser,
  authAdmin
}
