import pool from '../database/db.js'

class ToolMachine {
  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM herramientas_maquinas')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM herramientas_maquinas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createToolMachine (toolMachine) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO herramientas_maquinas (nombre_articulo, url_imagen, descripcion, precio_alquiler, cantidad_disponible, estado_herramienta_maquina_id) VALUES (?, ?, ?, ?, ?, ?)', [toolMachine.nombre_articulo, toolMachine.url_imagen, toolMachine.descripcion, toolMachine.precio_alquiler, toolMachine.cantidad_disponible, toolMachine.estado_herramienta_maquina_id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateToolMachine (toolMachine) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE herramientas_maquinas SET nombre_articulo = ?, url_imagen = ?, descripcion = ?, precio_alquiler = ?, cantidad_disponible = ?, estado_herramienta_maquina_id = ? WHERE id = ?', [toolMachine.nombre_articulo, toolMachine.url_imagen, toolMachine.descripcion, toolMachine.precio_alquiler, toolMachine.cantidad_disponible, toolMachine.estado_herramienta_maquina_id, toolMachine.id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteToolMachine (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM herramientas_maquinas WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default ToolMachine
