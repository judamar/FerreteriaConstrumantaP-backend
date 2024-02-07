import pool from '../database/db.js'

/* The SalesStatus class provides methods for creating, retrieving, updating, and deleting sales status
records in a database. */
class SalesStatus {
  static async create (salesStatus) {
    return await pool.query('INSERT INTO estados_ventas (estado) VALUES (?)', [salesStatus.estado])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM estados_ventas')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM estados_ventas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, salesStatus) {
    return await pool.query('UPDATE estados_ventas SET estado = ? WHERE id = ?', [salesStatus.estado, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM estados_ventas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default SalesStatus
