import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.JWT_SECRET_KEY

/**
 * The above code defines two middleware functions, `authenticateUser` and `authorizeAdmin`, that
 * handle user authentication and authorization respectively.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request headers, request body, request method, request URL, and
 * other relevant data.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used to move to the next middleware function
 * or to the final route handler.
 * @returns In the `authenticateUser` function, if there is no token provided in the request header, a
 * response with status code 401 and a JSON object containing the message "Access Denied. No token
 * provided." will be returned.
 */
const authUser = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' })
  }
  try {
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' })
  }
}

const authAdmin = (req, res, next) => {
  if (req.user.es_admin !== 1) {
    return res.status(403).json({ message: 'Access Denied. Only admins can access this resource.' })
  }
  next()
}

export default {
  authUser,
  authAdmin
}
