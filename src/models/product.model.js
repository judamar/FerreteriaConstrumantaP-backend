import pool from '../database/db.js'

class Product {
  static getAllProducts () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM producto')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getProductById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM producto WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default Product
