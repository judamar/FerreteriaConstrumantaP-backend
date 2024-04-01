import jwt from 'jsonwebtoken'
import 'dotenv/config'
import pc from 'picocolors'
import { handleUnauthorized, handleExpiredToken, handleNotFound, handleServerError } from '../utils/handles.js'
import User from '../models/user.model.js'

const secretKey = process.env.JWT_SECRET_KEY

/**
 * The `authUser` function is a middleware that authenticates a user by checking if an access token is
 * provided in the request headers, verifying the token, and setting the user information in the
 * request object.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, query parameters, and request body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting headers, status code, and sending data back to the client.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function or to the final route handler.
 * @returns In this code snippet, if there is no access token provided, the function will handle the
 * unauthorized request and return. If there is an access token provided, it will verify the token
 * using the `jwt.verify` method. If the token is expired, it will handle the expired token and return.
 * If the token is valid, it will decode the token and set the `req.id` and `req
 */
const authUser = (req, res, next) => {
  console.log(pc.bgBlue('AUTHENTICATING USER'))
  const accessToken = req.headers.authorization
  if (!accessToken) {
    handleUnauthorized(res, 'No has iniciado sesión.')
    console.log(pc.bgRed('USER NOT AUTHENTICATED, NO TOKEN PROVIDED'))
    return
  }
  try {
    jwt.verify(accessToken, secretKey, async (err, user) => {
      if (err) {
        handleExpiredToken(res, 'Sesión expirada, vuelve a iniciar sesión.')
      } else {
        const decoded = jwt.decode(accessToken)
        req.id = decoded.id
        req.esAdmin = decoded.esAdmin
        const user = await User.getById(req.id)
        if (!user) {
          handleNotFound(res, 'No existe el usuario.')
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
 * The authAdmin function checks if a user is an admin and authenticates them for further actions.
 * @param req - The `req` parameter represents the request object, which contains information about the
 * incoming HTTP request, such as headers, query parameters, and request body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to manipulate the response, such as
 * setting headers, sending data, and handling errors.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 */
const authAdmin = async (req, res, next) => {
  console.log(pc.bgBlue('CHECKING IF USER IS AN ADMIN'))
  try {
    const user = await User.getById(req.id)
    if (!user) {
      handleNotFound(res, 'No existe el usuario.')
      console.log(pc.bgRed('USER NOT AUTHENTICATED, USER NOT FOUND'))
    }
    if (req.esAdmin === 1) {
      console.log(pc.bgBlue('USER IS AN ADMIN'))
      console.log(pc.bgBlue('USER AUTHENTICATED SUCCESFULLY'))
      next()
    } else {
      handleUnauthorized(res, 'No tienes permiso para realizar esta acción.')
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
