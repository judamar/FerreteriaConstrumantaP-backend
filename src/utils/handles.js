/**
 * The above code defines functions to handle different types of HTTP responses in a JavaScript
 * application.
 */
const handleSuccess = (res, status, data) => {
  res.status(status).json({ status: 'SUCCESS', data })
}

const handleNotFound = (res, error) => {
  res.status(404).json({ status: 'NOT_FOUND', error })
}

const handleBadRequest = (res, error) => {
  res.status(400).json({ status: 'BAD_REQUEST', error })
}

const handleServerError = (res, error) => {
  res.status(500).json({ status: 'ERROR', error })
}

const handleUnauthorized = (res, message) => {
  res.status(401).json({ status: 'UNAUTHORIZED', error: message })
}

const handleExpiredToken = (res, message) => {
  res.status(491).json({ status: 'UNAUTHORIZED', error: message })
}

export { handleSuccess, handleNotFound, handleBadRequest, handleServerError, handleUnauthorized, handleExpiredToken }
