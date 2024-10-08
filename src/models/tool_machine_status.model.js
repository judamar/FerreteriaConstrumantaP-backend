import pool from '../database/db.js'

/* The ToolMachineStatus class provides methods for creating, retrieving, updating, and deleting tool
machine statuses in a database. */
class ToolMachineStatus {
  static async create (status) {
    return await pool.query('INSERT INTO ferre_c_estados_herramientas_maquinas (estado) VALUES (?)', [status.estado])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM ferre_c_estados_herramientas_maquinas')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM ferre_c_estados_herramientas_maquinas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, status) {
    return await pool.query('UPDATE ferre_c_estados_herramientas_maquinas SET estado = ? WHERE id = ?', [status.estado, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM ferre_c_estados_herramientas_maquinas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default ToolMachineStatus
