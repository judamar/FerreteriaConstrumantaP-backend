import pool from '../database/db.js'

class ReservationStatus {
  static create (status) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO estados_reservas (estado) VALUES (?)', [status])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estados_reservas')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estados_reservas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static update (id, status) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE estados_reservas SET estado = ? WHERE id = ?', [status, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static remove (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM estados_reservas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default ReservationStatus
