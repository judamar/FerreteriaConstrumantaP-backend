import pool from '../database/db.js'

class ReservationStatus {
  static async create (status) {
    return await pool.query('INSERT INTO estados_reservas (estado) VALUES (?)', [status])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM estados_reservas')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM estados_reservas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, status) {
    return await pool.query('UPDATE estados_reservas SET estado = ? WHERE id = ?', [status, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM estados_reservas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default ReservationStatus
