import pool from '../database/db.js'

/* The Sales class is a JavaScript class that provides methods for creating, retrieving, updating, and
deleting sales records from a database. */
class Sales {
  static async create (sale) {
    return await pool.query('INSERT INTO ventas (usuarios_id, estados_ventas_id) VALUES (?, ?)', [sale.usuarios_id, sale.estados_ventas_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT v.id AS venta_id, v.fecha_emision, u.nombre_completo AS nombre_cliente, u.cedula AS cedula, u.direccion AS direccion, ev.estado AS estado_venta, JSON_ARRAYAGG(JSON_OBJECT("cantidad", IFNULL(dv.cantidad_vendida, 0), "producto", IFNULL(p.nombre_producto, ""), "valor_unitario", IFNULL(p.precio, 0), "valor_sin_iva", IFNULL(p.precio / 1.19, 0), "valor_total", IFNULL(p.precio * dv.cantidad_vendida, 0))) AS productos, (SUM(IFNULL(p.precio * dv.cantidad_vendida, 0))/1.19) AS subototal, "19%" AS IVA, SUM(IFNULL(p.precio * dv.cantidad_vendida, 0)) AS total_venta FROM ventas AS v JOIN usuarios AS u ON v.usuarios_id = u.id JOIN estados_ventas AS ev ON v.estados_ventas_id = ev.id LEFT JOIN detalles_ventas AS dv ON v.id = dv.ventas_id LEFT JOIN productos AS p ON dv.productos_id = p.id GROUP BY v.id, v.fecha_emision, u.nombre_completo, u.cedula, u.direccion, ev.estado')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT v.id AS venta_id, v.fecha_emision, u.nombre_completo AS nombre_cliente, u.cedula AS cedula, u.direccion AS direccion, ev.estado AS estado_venta, JSON_ARRAYAGG(JSON_OBJECT("cantidad", IFNULL(dv.cantidad_vendida, 0), "producto", IFNULL(p.nombre_producto, ""), "valor_unitario", IFNULL(p.precio, 0), "valor_sin_iva", IFNULL(p.precio / 1.19, 0), "valor_total", IFNULL(p.precio * dv.cantidad_vendida, 0))) AS productos, (SUM(IFNULL(p.precio * dv.cantidad_vendida, 0))/1.19) AS subototal, "19%" AS IVA, SUM(IFNULL(p.precio * dv.cantidad_vendida, 0)) AS total_venta FROM ventas AS v JOIN usuarios AS u ON v.usuarios_id = u.id JOIN estados_ventas AS ev ON v.estados_ventas_id = ev.id LEFT JOIN detalles_ventas AS dv ON v.id = dv.ventas_id LEFT JOIN productos AS p ON dv.productos_id = p.id WHERE v.id = ? GROUP BY v.id, v.fecha_emision, u.nombre_completo, u.cedula, u.direccion, ev.estado', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByUserName (userName) {
    const searchTerm = `%${userName}%`
    return await pool.query('SELECT v.id AS venta_id, v.fecha_emision, u.nombre_completo AS nombre_cliente, u.cedula AS cedula, u.direccion AS direccion, ev.estado AS estado_venta, JSON_ARRAYAGG(JSON_OBJECT("cantidad", IFNULL(dv.cantidad_vendida, 0), "producto", IFNULL(p.nombre_producto, ""), "valor_unitario", IFNULL(p.precio, 0), "valor_sin_iva", IFNULL(p.precio / 1.19, 0), "valor_total", IFNULL(p.precio * dv.cantidad_vendida, 0))) AS productos, (SUM(IFNULL(p.precio * dv.cantidad_vendida, 0))/1.19) AS subototal, "19%" AS IVA, SUM(IFNULL(p.precio * dv.cantidad_vendida, 0)) AS total_venta FROM ventas AS v JOIN usuarios AS u ON v.usuarios_id = u.id JOIN estados_ventas AS ev ON v.estados_ventas_id = ev.id LEFT JOIN detalles_ventas AS dv ON v.id = dv.ventas_id LEFT JOIN productos AS p ON dv.productos_id = p.id WHERE u.nombre_completo LIKE ? GROUP BY v.id, v.fecha_emision, u.nombre_completo, u.cedula, u.direccion, ev.estado', [searchTerm])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, sale) {
    return await pool.query('UPDATE ventas SET usuarios_id = ?, estados_ventas_id = ? WHERE id = ?', [sale.usuarios_id, sale.estados_ventas_id, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM ventas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Sales
