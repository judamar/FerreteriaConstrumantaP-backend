import { createPool } from 'mysql2/promise'
import 'dotenv/config'
// import fs from 'fs'

/* The code is creating a connection pool using the `createPool` function from the `mysql2/promise`
library. */
const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || ''
  // ssl: fs.readFileSync(process.env.SSL_KEY)
})

export default pool
