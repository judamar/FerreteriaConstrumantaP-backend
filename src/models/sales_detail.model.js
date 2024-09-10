import pool from '../database/db.js'

/* The SalesDetail class is a JavaScript class that provides methods for creating, retrieving,
updating, and deleting sales details from a database. */
class SalesDetail {
  static async create (saleDetail) {
    const [insertSaleDetail] = await pool.query('INSERT INTO ferre_c_detalles_ventas (ventas_id, productos_id, cantidad_vendida) VALUES (?, ?, ?)', [saleDetail.ventas_id, saleDetail.productos_id, saleDetail.cantidad_vendida])
    const [updateProductResult] = await pool.query('UPDATE ferre_c_productos SET cantidad = cantidad - ? WHERE id = ?', [saleDetail.cantidad_vendida, saleDetail.productos_id])
    return {
      insertSaleDetail,
      updateProductResult
    }
  }

  static async getAll () {
    return await pool.query('SELECT * FROM ferre_c_detalles_ventas')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM ferre_c_detalles_ventas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getBySaleId (id) {
    return await pool.query('SELECT * FROM ferre_c_detalles_ventas WHERE ventas_id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, saleDetail) {
    return await pool.query('UPDATE ferre_c_detalles_ventas SET ventas_id = ?, productos_id = ?, cantidad_vendida = ? WHERE id = ?', [saleDetail.ventas_id, saleDetail.productos_id, saleDetail.cantidad_vendida, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM ferre_c_detalles_ventas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default SalesDetail
