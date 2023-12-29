import pool from '../database/db.js'

class SalesStatus {
  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estados_ventas')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estados_ventas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createSalesStatus (salesStatus) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO estados_ventas (estado) VALUES (?)', [salesStatus])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateSalesStatus (id, salesStatus) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE estados_ventas SET estado = ? WHERE id = ?', [salesStatus, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteSalesStatus (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM estados_ventas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default SalesStatus
