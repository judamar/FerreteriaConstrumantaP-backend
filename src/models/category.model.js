import pool from '../database/db.js'

class Category {
  static getAllCategories () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categorias')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getCategoryById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categorias WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createCategory (category) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO categorias (categoria) VALUES (?)', [category])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateCategory (id, category) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE categorias SET categoria = ? WHERE id = ?', [category, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteCategory (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM categorias WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default Category
