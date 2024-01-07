import pool from '../database/db.js'

class Category {
  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categorias')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categorias WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getByName (category) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categorias WHERE categoria = ?', [category])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static create (category) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO categorias (categoria) VALUES (?)', [category])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static update (id, category) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE categorias SET categoria = ? WHERE id = ?', [category, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static remove (id) {
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
