import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.JWT_SECRET_KEY

/**
 * The function generates a token for a given user.
 * @param user - The `user` parameter is an object that represents a user. It typically contains
 * information such as the user's ID, username, email, and any other relevant data.
 */
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    cedula: user.cedula,
    nombre: user.nombre_completo,
    esAdmin: user.es_admin
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secretKey, options)
}
