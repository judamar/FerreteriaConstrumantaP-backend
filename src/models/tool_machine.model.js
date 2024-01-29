import pool from '../database/db.js'
import { imageToURL } from '../utils/images.js'

class ToolMachine {
  static async create (toolMachine, img) {
    const urlImage = imageToURL(img)
    return await pool.query('INSERT INTO herramientas_maquinas (nombre_articulo, url_imagen, descripcion, precio_alquiler, cantidad_disponible, estados_herramientas_maquinas_id) VALUES (?, ?, ?, ?, ?, ?)', [toolMachine.nombre_articulo, urlImage, toolMachine.descripcion, toolMachine.precio_alquiler, toolMachine.cantidad_disponible, toolMachine.estados_herramientas_maquinas_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT hm.id, hm.nombre_articulo, hm.url_imagen, hm.descripcion, hm.precio_alquiler, hm.cantidad_disponible, ehm.estado as estado FROM herramientas_maquinas hm JOIN estados_herramientas_maquinas ehm ON hm.estados_herramientas_maquinas_id = ehm.id')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT hm.id, hm.nombre_articulo, hm.url_imagen, hm.descripcion, hm.precio_alquiler, hm.cantidad_disponible, ehm.estado as estado FROM herramientas_maquinas hm JOIN estados_herramientas_maquinas ehm ON hm.estados_herramientas_maquinas_id = ehm.id WHERE hm.id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByName (name) {
    return await pool.query('SELECT hm.id, hm.nombre_articulo, hm.url_imagen, hm.descripcion, hm.precio_alquiler, hm.cantidad_disponible, ehm.estado as estado FROM herramientas_maquinas hm JOIN estados_herramientas_maquinas ehm ON hm.estados_herramientas_maquinas_id = ehm.id WHERE nombre_articulo LIKE ?', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, toolMachine) {
    return await pool.query('UPDATE herramientas_maquinas SET nombre_articulo = ?, descripcion = ?, precio_alquiler = ?, cantidad_disponible = ? WHERE id = ?', [toolMachine.nombre_articulo, toolMachine.descripcion, toolMachine.precio_alquiler, toolMachine.cantidad_disponible, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async updateImage (id, img) {
    const urlImage = await imageToURL(img)
    return await pool.query('UPDATE herramientas_maquinas SET url_imagen = ? WHERE id = ?', [urlImage, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async updateState (id, state) {
    return await pool.query('UPDATE herramientas_maquinas SET estados_herramientas_maquinas_id = ? WHERE id = ?', [state, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM herramientas_maquinas WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default ToolMachine
