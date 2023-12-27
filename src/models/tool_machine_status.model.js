import pool from '../database/db.js'

class ToolMachineStatus {
  static getAllStatus () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estados_herramientas_maquinas')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getStatus (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estados_herramientas_maquinas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createStatus (status) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO estados_herramientas_maquinas (estado) VALUES (?)', [status])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateStatus (id, status) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE estados_herramientas_maquinas SET estado = ? WHERE id = ?', [status, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteStatus (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM estados_herramientas_maquinas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default ToolMachineStatus
