import pool from '../database/db.js'

class Suggestion {
  static getAllSuggestions () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM sugerencia')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getSuggestionById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM sugerenciaWHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }

  static createSuggestion (suggestion) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO sugerencia (sugerencia) VALUES (?)', [suggestion])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateSuggestion (id, suggestion) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE sugerencia SET sugerencia = ? WHERE id = ?', [suggestion, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteSuggestion (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM sugerencia WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default Suggestion
