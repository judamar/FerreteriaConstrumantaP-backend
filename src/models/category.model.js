import pool from '../database/db.js'

class Category {
  static getAllCategories () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categories')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getCategoryById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categories WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createCategory (category) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO categoria (categoria) VALUES(?);', [category])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default Category
