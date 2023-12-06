import express, { json } from 'express'
import pc from 'picocolors'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares/cors.js'
import ProductRouter from './routes/products.routes.js'
import pool from './database/db.js'

const PORT = process.env.PORT ?? 3000 // obtiene el puerto del sistema operativo o el 3000 si no existe
const app = express()

app.disable('x-powered-by') // deshabilita la cabecera X-Powered-By
app.use(json()) // habilita el uso de json

app.use(morgan('dev'))
app.use(corsMiddleware())

pool.getConnection()
  .then(conection => {
    console.log(pc.green('[+] '), pc.white('Database connected to host: '), pc.yellow(process.env.DB_HOST))
    conection.release()
  })
  .catch(err => {
    console.log(pc.red('[-] '), pc.white('Database connection error: '), err)
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/productos', ProductRouter)

app.use('*', (req, res) => { // maneja las solicitudes no encontradas y devuelve un mensaje de error 404
  res.status(404).send('<h1>404 not found, go back to home</h1><a href="http://localhost:3000/">home</a>')
})

// inicializamos servidor
app.listen(PORT, () => {
  console.log(pc.green('[+] '), pc.white('Server running on port: '), pc.yellow(PORT))
})
