import pool from '../database/db.js'

class Sales {
  static async create (sale) {
    return await pool.query('INSERT INTO ventas (usuario_id, total_venta, enviar_factura, estado_venta_id) VALUES (?, ?, ?, ?)', [sale.usuario_id, sale.total_venta, sale.enviar_factura, sale.estado_venta_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM ventas')
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
