import pool from '../database/db.js'

/* The Reservation class is a JavaScript class that provides methods for creating, retrieving,
updating, and deleting reservations in a database. */
class Reservation {
  static async create (reservation) {
    const [checkToolAvailability] = await pool.query('SELECT cantidad_disponible FROM herramientas_maquinas WHERE id = ?', [reservation.herramienta_maquina_id])
    const cantidadDisponible = checkToolAvailability[0].cantidad_disponible
    // Verificar si la cantidad disponible es cero o menor a la cantidad a reservar
    if (cantidadDisponible <= 0) {
      throw new Error('La cantidad disponible de la herramienta es cero. No se puede crear la reserva.')
    }
    if (reservation.cantidad > cantidadDisponible) {
      throw new Error('La cantidad a reservar es mayor que la cantidad disponible de la herramienta.')
    }
    // Si las verificaciones son exitosas, proceder con la inserción y actualización
    const [insertReservationResult] = await pool.query('INSERT INTO reservas (usuarios_id, herramientas_maquinas_id, fecha_fin, cantidad, estados_reservas_id) VALUES (?, ?, ?, ?, ?)', [reservation.usuario_id, reservation.herramienta_maquina_id, reservation.fecha_fin, reservation.cantidad, reservation.estado_reserva_id])
    const [updateToolMachineResult] = await pool.query('UPDATE herramientas_maquinas SET cantidad_disponible = cantidad_disponible - ? WHERE id = ?', [reservation.cantidad, reservation.herramienta_maquina_id])
    return {
      insertReservationResult,
      updateToolMachineResult
    }
  }

  static async getAll () {
    return await pool.query('SELECT r.id, u.nombre_completo, u.cedula, u.telefono, hm.nombre_articulo, CONCAT(DATE_FORMAT(r.fecha_inicio, "%d/%m/%Y"), " ", DATE_FORMAT(r.fecha_inicio, "%H:%i")) AS fecha_inicio_format, DATE_FORMAT(r.fecha_fin, "%d/%m/%Y") AS fecha_fin_format, DATEDIFF(r.fecha_fin, r.fecha_inicio) AS dias_alquiler, r.cantidad, hm.precio_alquiler, ((r.cantidad * hm.precio_alquiler) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) AS total, er.estado FROM reservas r JOIN usuarios u ON r.usuarios_id = u.id JOIN herramientas_maquinas hm ON r.herramientas_maquinas_id = hm.id JOIN estados_reservas er ON r.estados_reservas_id = er.id ORDER BY r.id DESC')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT r.id, u.nombre_completo, u.cedula, u.telefono, hm.nombre_articulo, CONCAT(DATE_FORMAT(r.fecha_inicio, "%d/%m/%Y"), " ", DATE_FORMAT(r.fecha_inicio, "%H:%i")) AS fecha_inicio_format, DATE_FORMAT(r.fecha_fin, "%d/%m/%Y") AS fecha_fin_format, DATEDIFF(r.fecha_fin, r.fecha_inicio) AS dias_alquiler, r.cantidad, hm.precio_alquiler, ((r.cantidad * hm.precio_alquiler) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) AS total, er.estado FROM reservas r JOIN usuarios u ON r.usuarios_id = u.id JOIN herramientas_maquinas hm ON r.herramientas_maquinas_id = hm.id JOIN estados_reservas er ON r.estados_reservas_id = er.id WHERE r.id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByUserName (name) {
    return await pool.query('SELECT r.id, u.nombre_completo, u.cedula, u.telefono, hm.nombre_articulo, CONCAT(DATE_FORMAT(r.fecha_inicio, "%d/%m/%Y"), " ", DATE_FORMAT(r.fecha_inicio, "%H:%i")) AS fecha_inicio_format, DATE_FORMAT(r.fecha_fin, "%d/%m/%Y") AS fecha_fin_format, DATEDIFF(r.fecha_fin, r.fecha_inicio) AS dias_alquiler, r.cantidad, hm.precio_alquiler, ((r.cantidad * hm.precio_alquiler) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) AS total, er.estado FROM reservas r JOIN usuarios u ON r.usuarios_id = u.id JOIN herramientas_maquinas hm ON r.herramientas_maquinas_id = hm.id JOIN estados_reservas er ON r.estados_reservas_id = er.id WHERE u.nombre_completo LIKE ?', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByToolName (name) {
    return await pool.query('SELECT r.id, u.nombre_completo, u.cedula, u.telefono, hm.nombre_articulo, CONCAT(DATE_FORMAT(r.fecha_inicio, "%d/%m/%Y"), " ", DATE_FORMAT(r.fecha_inicio, "%H:%i")) AS fecha_inicio_format, DATE_FORMAT(r.fecha_fin, "%d/%m/%Y") AS fecha_fin_format, DATEDIFF(r.fecha_fin, r.fecha_inicio) AS dias_alquiler, r.cantidad, hm.precio_alquiler, ((r.cantidad * hm.precio_alquiler) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) AS total, er.estado FROM reservas r JOIN usuarios u ON r.usuarios_id = u.id JOIN herramientas_maquinas hm ON r.herramientas_maquinas_id = hm.id JOIN estados_reservas er ON r.estados_reservas_id = er.id WHERE hm.nombre_articulo LIKE ? ORDER BY r.id DESC', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, reservation) {
    return await pool.query('UPDATE reservas SET usuarios_id = ?, herramientas_maquinas_id = ?, fecha_inicio = ? WHERE id = ?', [reservation.usuarios_id, reservation.herramientas_maquinas_id, reservation.fecha_inicio, id])
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
