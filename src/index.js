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

class ExpressApp {
  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? 3000
    this.pc = pc
    this.pool = pool

    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeDatabase()
  }

  initializeMiddlewares () { // middlewares
    this.app.disable('x-powered-by')
    this.app.use(json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.use(corsMiddleware())
  }

  initializeRoutes () { // routes
    this.app.get('/', (req, res) => {
      res.send('<h1>Ferreteria Construmanta P</h1>')
    })

    this.app.use('/api/productos', ProductRouter)
    this.app.use('/api/categorias', CategoryRouter)
    this.app.use('/api/proveedores', ProviderRouter)
    this.app.use('/api/proveedores_tienen_categorias', ProviderHasCategoryRouter)
    this.app.use('/api/sugerencias', SuggestionRouter)
    this.app.use('/api/usuarios', UserRouter)
    this.app.use('/api/estados_reserva', ReservationStatusRouter)
    this.app.use('/api/reservas', ReservationRouter)
    this.app.use('/api/estados_herramienta_maquina', TMStatusRouter)
    this.app.use('/api/herramientas_maquinas', ToolsMachinesRouter)
    this.app.use('/api/estados_venta', SalesStatusRouter)
    this.app.use('/api/ventas', SalesRouter)
    this.app.use('/api/detalles_ventas', SalesDetailRouter)
    this.app.use('/api/send_email', SendEmailRouter)
  }

  initializeDatabase () { // connect database
    this.pool.getConnection()
      .then(connection => {
        console.log(this.pc.green('[+] '), this.pc.white('Database connected to host: '), this.pc.yellow(process.env.DB_HOST))
        connection.release()
      })
      .catch(err => {
        console.log(this.pc.red('[-] '), this.pc.white('Database connection error: '), err)
      })
  }

  startServer () { // starts server
    this.app.listen(this.port, () => {
      console.log(this.pc.green('[+] '), this.pc.white('Server running on port: '), this.pc.yellow(this.port))
    })
  }
}

// Initialize and start the server
const server = new ExpressApp()
server.startServer()
