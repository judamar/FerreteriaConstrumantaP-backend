import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:4000'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({ // habilita el uso de cors
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) { // si el origen es válido, permite el acceso a la API
      return callback(null, true)
    }

    if (!origin) { // si el origen no es válido, permite el acceso a la API
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS')) // si el origen no es válido, no permite el acceso a la API
  }
})
