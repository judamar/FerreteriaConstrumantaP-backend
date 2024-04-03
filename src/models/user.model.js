import pool from '../database/db.js'
import password from '../utils/password.js'

/* The User class is a JavaScript class that provides methods for creating, authenticating, retrieving,
updating, and deleting user data from a database. */
class User {
  static async create (user) {
    return await pool.query('INSERT INTO usuarios (cedula, nombre_completo, correo_electronico, telefono, direccion, password) VALUES (?, ?, ?, ?, ?, ?)', [user.cedula, user.nombre_completo, user.correo_electronico, user.telefono, user.direccion, user.password])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async authenticate (cedula, providedPassword) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula])
    if (rows.length > 0 && await password.comparePassword(providedPassword, rows[0].password)) {
      return rows[0]
    } else {
      return null
    }
  }

  static async getAll () {
    return await pool.query('SELECT id, cedula, nombre_completo, correo_electronico, telefono, direccion, es_admin FROM usuarios')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT id, cedula, nombre_completo, correo_electronico, telefono, direccion, es_admin FROM usuarios WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByCedula (cedula) {
    return await pool.query('SELECT id, cedula, nombre_completo, correo_electronico, telefono, direccion, es_admin FROM usuarios WHERE cedula = ?', [cedula])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, user) {
    return await pool.query('UPDATE usuarios SET cedula = ?, nombre_completo = ?, correo_electronico = ?, telefono = ?, direccion = ? WHERE id = ?', [user.cedula, user.nombre_completo, user.correo_electronico, user.telefono, user.direccion, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async updatePassword (id, password) {
    return await pool.query('UPDATE usuarios SET password = ? WHERE id = ?', [password, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM usuarios WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default User
