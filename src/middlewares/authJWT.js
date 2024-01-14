import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.JWT_SECRET_KEY

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    correo_electronico: user.correo_electronico,
    cedula: user.cedula
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secretKey, options)
}
