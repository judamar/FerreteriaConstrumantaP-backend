import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:4000'
]

/**
 * The above function is a CORS middleware that checks if the origin of a request is allowed and
 * returns an error if it is not.
 * @param [] - - `acceptedOrigins`: This is an optional parameter that specifies the list of accepted
 * origins for CORS requests. If not provided, it defaults to `ACCEPTED_ORIGINS`.
 */
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
