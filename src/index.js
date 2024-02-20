import express, { json } from 'express'
import pc from 'picocolors'
import morgan from 'morgan'
import 'dotenv/config'

// Import utils
import { corsMiddleware } from './middlewares/cors.js'
import pool from './database/db.js'

// Import routes
import ProductRouter from './routes/products.routes.js'
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
import SendEmailRouter from './routes/sendEmail.routes.js'

const PORT = process.env.PORT ?? 3000 // get server port or use 3000 by default
const app = express()

app.disable('x-powered-by') // dissable header X-Powered-By
app.use(json()) // enable json
app.use(express.urlencoded({ extended: true })) // enable forms

app.use(morgan('dev'))
app.use(corsMiddleware()) // enables cors in all routes

pool.getConnection() // connect to db
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

// ROUTES
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
app.use('/api/send_email', SendEmailRouter)

// Initialize the server
app.listen(PORT, () => {
  console.log(pc.green('[+] '), pc.white('Server running on port: '), pc.yellow(PORT))
})
