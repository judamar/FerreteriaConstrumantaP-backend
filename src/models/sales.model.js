import pool from '../database/db.js'

class Sales {
  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM ventas')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM ventas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static create (sale) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO ventas(usuario_id, total_venta, enviar_factura, estado_venta_id) SET ?, ?, ? , ?', [sale.usuario_id, sale.total_venta, sale.enviar_factura, sale.estado_venta_id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static update (id, sale) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE ventas SET ? WHERE id = ?', [sale.usuario_id, sale.total_venta, sale.enviar_factura, sale.estado_venta_id, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static delete (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM ventas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default Sales
