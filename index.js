const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by') // deshabilita la cabecera X-Powered-By
app.use(express.json()) // habilita el uso de json
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:4000'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.use('*', (req, res) => {
  res.status(404).send('<h1>404 not found, go back to home</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
