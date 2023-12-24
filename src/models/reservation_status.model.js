import pool from '../database/db.js'

class ReservationStatus {
  static getAllReservationStatus () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estado_reserva')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getReservationStatusById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estado_reserva WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createReservationStatus (status) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO estado_reserva (estado) VALUES (?)', [status])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateReservationStatus (id, status) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE estado_reserva SET estado = ? WHERE id = ?', [status, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteReservationStatus (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM estado_reserva WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default ReservationStatus
