import pool from '../database/db.js'

class Category {
  static getAll () {
    return pool.query('SELECT * FROM categorias')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getById (id) {
    return pool.query('SELECT * FROM categorias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getByName (name) {
    return pool.query('SELECT * FROM categorias WHERE categoria = ?', [name])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static create (category) {
    return pool.query('INSERT INTO categorias (categoria) VALUES (?)', [category])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static update (id, category) {
    return pool.query('UPDATE categorias SET categoria = ? WHERE id = ?', [category, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static remove (id) {
    return pool.query('DELETE FROM categorias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Category
