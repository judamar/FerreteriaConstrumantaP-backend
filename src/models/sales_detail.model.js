import pool from '../database/db.js'

class SalesDetail {
  static async create (saleDetail) {
    const [insertSaleDetail] = await pool.query('INSERT INTO detalles_ventas (ventas_id, productos_id, cantidad_vendida) VALUES (?, ?, ?)', [saleDetail.ventas_id, saleDetail.productos_id, saleDetail.cantidad_vendida])
    const [updateProductResult] = await pool.query('UPDATE productos SET cantidad = cantidad - ? WHERE id = ?', [saleDetail.cantidad_vendida, saleDetail.productos_id])
    return {
      insertSaleDetail,
      updateProductResult
    }
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
