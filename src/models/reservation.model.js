import pool from '../database/db.js'

class Reservation {
  static async create (reservation) {
    return await pool.query('INSERT INTO reservas (usuarios_id, herramientas_maquinas_id, fecha_fin, cantidad, estados_reservas_id) VALUES (?, ?, ?, ?, ?)', [reservation.usuario_id, reservation.herramienta_maquina_id, reservation.fecha_fin, reservation.cantidad, reservation.estado_reserva_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM reservas')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM reservas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, reservation) {
    return await pool.query('UPDATE reservas SET usuario_id = ?, herramienta_maquina_id = ?, fecha_inicio = ?, fecha_fin = ?, cantidad = ?, estado_reserva_id = ? WHERE id = ?', [reservation.usuario_id, reservation.herramienta_maquina_id, reservation.fecha_inicio, reservation.fecha_fin, reservation.cantidad, reservation.estado_reserva_id, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM reservas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Reservation
