import pool from '../database/db.js'

/* The ReservationStatus class is a JavaScript class that provides methods for creating, retrieving,
updating, and deleting reservation statuses in a database. */
class ReservationStatus {
  static async create (status) {
    return await pool.query('INSERT INTO estados_reservas (estado) VALUES (?)', [status.estado])
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
    return await pool.query('UPDATE estados_reservas SET estado = ? WHERE id = ?', [status.estado, id])
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
  /* The Reservation class is a JavaScript class that provides methods for creating, retrieving,
  updating, and deleting reservations in a database. */
  }
}

export default ReservationStatus
