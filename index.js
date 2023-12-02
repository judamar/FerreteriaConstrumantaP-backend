const express = require('express')

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
})

app.get('/', (req, res) => {
  res.status(200).send('<h1>Ferreteria Construmanta P</h1>')
})

app.get('/acerca', (req, res) => {
  res.status(200).send('<h1>Sobre nosotros</h1>')
})

app.get('/contacto', (req, res) => {
  res.status(200).send('<h1>Contactanos</h1>')
})

app.get('/catalogo', (req, res) => {
  res.status(200).send('<h1>Catálogo</h1>')
})

app.get('/login', (req, res) => {
  res.status(200).send('<h1>Iniciar Sesión</h1>')
})

app.use('*', (req, res) => {
  res.status(404).send('<h1>404 not found, go back to home</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
