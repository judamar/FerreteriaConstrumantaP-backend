import pool from '../database/db.js'

class Reservation {
  static async create (reservation) {
    const [insertReservationResult] = await pool.query('INSERT INTO reservas (usuarios_id, herramientas_maquinas_id, fecha_fin, cantidad, estados_reservas_id) VALUES (?, ?, ?, ?, ?)', [reservation.usuario_id, reservation.herramienta_maquina_id, reservation.fecha_fin, reservation.cantidad, reservation.estado_reserva_id])
    const [updateToolMachineResult] = await pool.query('UPDATE herramientas_maquinas SET cantidad_disponible = cantidad_disponible - ? WHERE id = ?', [reservation.cantidad, reservation.herramienta_maquina_id])
    return {
      insertReservationResult,
      updateToolMachineResult
    }
  }

  static async getAll () {
    return await pool.query('SELECT r.id, u.nombre_completo, u.cedula, u.telefono, hm.nombre_articulo, r.fecha_inicio, r.fecha_fin, DATEDIFF(r.fecha_fin, r.fecha_inicio) AS dias_alquiler, r.cantidad, hm.precio_alquiler, ((r.cantidad * hm.precio_alquiler) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) AS total, er.estado FROM reservas r JOIN usuarios u ON r.usuarios_id = u.id JOIN herramientas_maquinas hm ON r.herramientas_maquinas_id = hm.id JOIN estados_reservas er ON r.estados_reservas_id = er.id')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT r.id, u.nombre_completo, u.cedula, u.telefono, hm.nombre_articulo, r.fecha_inicio, r.fecha_fin, DATEDIFF(r.fecha_fin, r.fecha_inicio) AS dias_alquiler, r.cantidad, hm.precio_alquiler, ((r.cantidad * hm.precio_alquiler) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) AS total, er.estado FROM reservas r JOIN usuarios u ON r.usuarios_id = u.id JOIN herramientas_maquinas hm ON r.herramientas_maquinas_id = hm.id JOIN estados_reservas er ON r.estados_reservas_id = er.id WHERE r.id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByUserName (name) {
    return await pool.query('SELECT r.id, u.nombre_completo, u.cedula, u.telefono, hm.nombre_articulo, r.fecha_inicio, r.fecha_fin, DATEDIFF(r.fecha_fin, r.fecha_inicio) AS dias_alquiler, r.cantidad, hm.precio_alquiler, ((r.cantidad * hm.precio_alquiler) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) AS total, er.estado FROM reservas r JOIN usuarios u ON r.usuarios_id = u.id JOIN herramientas_maquinas hm ON r.herramientas_maquinas_id = hm.id JOIN estados_reservas er ON r.estados_reservas_id = er.id WHERE u.nombre_completo LIKE ?', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByToolName (name) {
    return await pool.query('SELECT r.id, u.nombre_completo, u.cedula, u.telefono, hm.nombre_articulo, r.fecha_inicio, r.fecha_fin, DATEDIFF(r.fecha_fin, r.fecha_inicio) AS dias_alquiler, r.cantidad, hm.precio_alquiler, ((r.cantidad * hm.precio_alquiler) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) AS total, er.estado FROM reservas r JOIN usuarios u ON r.usuarios_id = u.id JOIN herramientas_maquinas hm ON r.herramientas_maquinas_id = hm.id JOIN estados_reservas er ON r.estados_reservas_id = er.id WHERE hm.nombre_articulo LIKE ?', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, reservation) {
    return await pool.query('UPDATE reservas SET usuarios_id = ?, herramientas_maquinas_id = ?, fecha_inicio = ?, fecha_fin = ?, cantidad = ?, estados_reservas_id = ? WHERE id = ?', [reservation.usuario_id, reservation.herramienta_maquina_id, reservation.fecha_inicio, reservation.fecha_fin, reservation.cantidad, reservation.estado_reserva_id, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async updateState (id, state) {
    return await pool.query('UPDATE reservas SET estados_reservas_id = ? WHERE id = ?', [state, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async updateEndDate (id, endDate) {
    return await pool.query('UPDATE reservas SET fecha_fin = ? WHERE id = ?', [endDate, id])
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
