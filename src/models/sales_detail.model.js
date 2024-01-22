import pool from '../database/db.js'

class SalesDetail {
  static async create (saleDetail) {
    return await pool.query('INSERT INTO detalles_ventas (venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', [saleDetail.venta_id, saleDetail.producto_id, saleDetail.cantidad, saleDetail.precio_unitario])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM detalles_ventas')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM detalles_ventas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, saleDetail) {
    return await pool.query('UPDATE detalles_ventas SET venta_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ? WHERE id = ?', [saleDetail.venta_id, saleDetail.producto_id, saleDetail.cantidad, saleDetail.precio_unitario, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM detalles_ventas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default SalesDetail
