const express = require('express')

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by') // deshabilita la cabecera X-Powered-By

app.use('*', (req, res) => {
  res.status(404).send('<h1>404 not found, go back to home</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
