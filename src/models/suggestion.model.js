import pool from '../database/db.js'

class Suggestion {
  static async create (suggestion) {
    return await pool.query('INSERT INTO sugerencias (sugerencias) VALUES (?)', [suggestion])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM sugerencias')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM sugerencias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, suggestion) {
    return await pool.query('UPDATE sugerencias SET sugerencias = ? WHERE id = ?', [suggestion, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM sugerencias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Suggestion
