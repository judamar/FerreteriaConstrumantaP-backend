import pool from '../database/db.js'

class Category {
  static getAllCategories () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categoria')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getCategoryById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categoria WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createCategory (category) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO categoria (categoria) VALUES (?)', [category], (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results) // Resolve the promise with the inserted data
        }
      })
    })
  }

  static updateCategory (category) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE categoria SET categoria = ? WHERE id = ?', [category.categoria, category.id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default Category
