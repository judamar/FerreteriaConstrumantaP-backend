import pool from '../database/db.js'
import password from '../utils/password.js'

class User {
  static async create (user) {
    const hashedPassword = await password.hashPassword(user.password)
    return pool.query('INSERT INTO usuarios (cedula, nombre_completo, correo_electronico, telefono, direccion, password, es_admin) VALUES (?, ?, ?, ?, ?, ?, ?)', [user.cedula, user.nombre_completo, user.correo_electronico, user.telefono, user.direccion, hashedPassword, user.es_admin])
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

  static getAll () {
    return pool.query('SELECT * FROM usuarios')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getById (id) {
    return pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getByCedula (cedula) {
    return pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, user) {
    const passwordHashed = await password.hashPassword(user.password)
    return pool.query('UPDATE usuarios SET cedula = ?, nombre_completo = ?, correo_electronico = ?, telefono = ?, direccion = ?, password = ?, es_admin = ? WHERE id = ?', [user.cedula, user.nombre_completo, user.correo_electronico, user.telefono, user.direccion, passwordHashed, user.es_admin, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static remove (id) {
    return pool.query('DELETE FROM usuarios WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default User
