import express, { json } from 'express'
import pc from 'picocolors'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares/cors.js'
import ProductRouter from './routes/products.routes.js'
import pool from './database/db.js'
import CategoryRouter from './routes/categories.routes.js'
import ProviderRouter from './routes/providers.routes.js'
import SuggestionRouter from './routes/suggestion.routes.js'
import UserRouter from './routes/users.routes.js'
import ReservationStatusRouter from './routes/reservation_statuses.routes.js'
import TMStatusRouter from './routes/tools_machines_statuses.routes.js'
import ToolsMachinesRouter from './routes/tools_machines.routes.js'
import ReservationRouter from './routes/reservation.routes.js'
import SalesStatusRouter from './routes/sales_status.routes.js'
import SalesRouter from './routes/sales.routes.js'
import SalesDetailRouter from './routes/sales_details.routes.js'
import ProviderHasCategoryRouter from './routes/providers_has_categories.routes.js'

const PORT = process.env.PORT ?? 3000 // obtiene el puerto del sistema operativo o el 3000 si no existe
const app = express()

app.disable('x-powered-by') // deshabilita la cabecera X-Powered-By
app.use(json()) // habilita el uso de json

app.use(morgan('dev')) // habilita el log de las solicitudes en la consola
app.use(corsMiddleware()) // habilita el uso de CORS en todas las rutas

pool.getConnection() // conecta a la base de datos y devuelve una conexión
  .then(conection => {
    console.log(pc.green('[+] '), pc.white('Database connected to host: '), pc.yellow(process.env.DB_HOST))
    conection.release()
  })
  .catch(err => {
    console.log(pc.red('[-] '), pc.white('Database connection error: '), err)
  })

app.get('/', (req, res) => {
  res.send('<h1>Ferreteria Construmanta P</h1>')
})

app.use('/api/productos', ProductRouter)
app.use('/api/categorias', CategoryRouter)
app.use('/api/proveedores', ProviderRouter)
app.use('/api/proveedores_tienen_categorias', ProviderHasCategoryRouter)
app.use('/api/sugerencias', SuggestionRouter)
app.use('/api/usuarios', UserRouter)
app.use('/api/estados_reserva', ReservationStatusRouter)
app.use('/api/reservas', ReservationRouter)
app.use('/api/estados_herramienta_maquina', TMStatusRouter)
app.use('/api/herramientas_maquinas', ToolsMachinesRouter)
app.use('/api/estados_venta', SalesStatusRouter)
app.use('/api/ventas', SalesRouter)
app.use('/api/detalles_ventas', SalesDetailRouter)

app.use('*', (req, res) => { // maneja las solicitudes no encontradas y devuelve un mensaje de error 404
  res.status(404).send('<h1>404 not found, go back to home</h1><a href="http://localhost:3000/">home</a>')
})

// inicializamos servidor
app.listen(PORT, () => {
  console.log(pc.green('[+] '), pc.white('Server running on port: '), pc.yellow(PORT))
})
