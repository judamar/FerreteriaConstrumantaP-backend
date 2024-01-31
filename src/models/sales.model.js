import pool from '../database/db.js'

class Sales {
  static async create (sale) {
    return await pool.query('INSERT INTO ventas (usuarios_id, enviar_factura, estados_ventas_id) VALUES (?, ?, ?)', [sale.usuarios_id, sale.enviar_factura, sale.estados_ventas_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT v.id AS venta_id, v.fecha_emision, u.nombre_completo AS nombre_cliente, ev.estado AS estado_venta, JSON_ARRAYAGG(JSON_OBJECT("cantidad", dv.cantidad_vendida, "producto", p.nombre_producto, "valor_unitario", p.precio, "valor_sin_iva", p.precio / 1.19, "valor_total", p.precio * dv.cantidad_vendida)) AS productos, (SUM(p.precio * dv.cantidad_vendida)/1.19) AS subototal, "19%" AS IVA, SUM(p.precio * dv.cantidad_vendida) AS total_venta FROM ventas AS v JOIN usuarios AS u ON v.usuarios_id = u.id JOIN estados_ventas AS ev ON v.estados_ventas_id = ev.id JOIN detalles_ventas AS dv ON v.id = dv.ventas_id JOIN productos AS p ON dv.productos_id = p.id GROUP BY v.id, v.fecha_emision, u.nombre_completo, ev.estado')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM ventas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByUserName (userName) {
    const searchTerm = `%${userName}%`
    return await pool.query('SELECT v.*, u.nombre_usuario FROM ventas v JOIN usuarios u ON v.usuario_id = u.id WHERE u.nombre_usuario LIKE ?', [searchTerm])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, sale) {
    return await pool.query('UPDATE ventas SET usuario_id = ?, total_venta = ?, enviar_factura = ?, estado_venta_id = ? WHERE id = ?', [sale.usuario_id, sale.total_venta, sale.enviar_factura, sale.estado_venta_id, id])
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
