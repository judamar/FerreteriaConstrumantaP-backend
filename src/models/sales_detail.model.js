import pool from '../database/db.js'

class SalesDetail {
  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM detalles_ventas')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM detalles_ventas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static create (saleDetail) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO detalles_ventas (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', saleDetail)
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static update (saleDetail) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE detalles_ventas SET id_venta = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id = ?', saleDetail)
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static delete (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM detalles_ventas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default SalesDetail
