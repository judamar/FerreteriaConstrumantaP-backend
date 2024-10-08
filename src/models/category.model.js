import pool from '../database/db.js'

/* The Category class is a JavaScript class that provides methods for creating, retrieving, updating,
and deleting categories in a database. */
class Category {
  static async create (category) {
    return await pool.query('INSERT INTO ferre_c_categorias (categoria) VALUES (?)', [category.categoria])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM ferre_c_categorias')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM ferre_c_categorias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByName (name) {
    return await pool.query('SELECT * FROM ferre_c_categorias WHERE categoria LIKE ?', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, category) {
    return await pool.query('UPDATE ferre_c_categorias SET categoria = ? WHERE id = ?', [category.categoria, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM ferre_c_categorias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Category
