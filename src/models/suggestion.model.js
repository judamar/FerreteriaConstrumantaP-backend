import pool from '../database/db.js'

/* The Suggestion class provides methods for creating, retrieving, and removing suggestions from a
database. */
class Suggestion {
  static async create (suggestion) {
    return await pool.query('INSERT INTO ferre_c_sugerencias (usuarios_id, mensaje) VALUES (?, ?)', [suggestion.usuarios_id, suggestion.mensaje])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT s.id, u.nombre_completo, s.mensaje FROM ferre_c_sugerencias s JOIN usuarios u ON s.usuarios_id = u.id')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM ferre_c_sugerencias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Suggestion
