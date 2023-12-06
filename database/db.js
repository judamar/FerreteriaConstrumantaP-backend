import { createPool } from 'mysql2/promise'
import 'dotenv/config'
import fs from 'fs'

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    ca: fs.readFileSync('cacert-2023-08-22.pem')
  }
})

export default pool
