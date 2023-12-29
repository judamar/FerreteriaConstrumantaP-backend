import pool from '../database/db.js'

class Reservation {
  static getAllReservations () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM reservas')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getReservationById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM reservas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createReservation (reservation) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO reservas(usuario_id, herramienta_maquina_id, fecha_inicio, fecha_fin, cantidad, estado_reserva_id) SET ?, ?, ?, ?, ?, ?', [reservation.usuario_id, reservation.herramienta_maquina_id, reservation.fecha_inicio, reservation.fecha_fin, reservation.cantidad, reservation.estado_reserva_id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateReservation (reservation) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE reservas SET usuario_id = ?, herramienta_maquina_id = ?, fecha_inicio = ?, fecha_fin = ?, cantidad = ?, estado_reserva_id = ? WHERE id = ?', [reservation.usuario_id, reservation.herramienta_maquina_id, reservation.fecha_inicio, reservation.fecha_fin, reservation.cantidad, reservation.estado_reserva_id, reservation.id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteReservation (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM reservas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default Reservation
