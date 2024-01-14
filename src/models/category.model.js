import pool from '../database/db.js'

class Category {
  static async getAll () {
    return await pool.query('SELECT * FROM categorias')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM categorias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByName (name) {
    return await pool.query('SELECT * FROM categorias WHERE categoria = ?', [name])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async create (category) {
    return await pool.query('INSERT INTO categorias (categoria) VALUES (?)', [category])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, category) {
    return await pool.query('UPDATE categorias SET categoria = ? WHERE id = ?', [category, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM categorias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Category
