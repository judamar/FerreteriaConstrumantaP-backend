import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.JWT_SECRET_KEY

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    cedula: user.cedula,
    esAdmin: user.es_admin
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secretKey, options)
}
