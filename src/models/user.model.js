import pool from '../database/db.js'
import password from '../utils/password.js'

class User {
  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM usuarios')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getByCedula (cedula) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static async create (user) {
    const passwordHashed = await password.hashPassword(user.password)
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO usuarios(cedula, nombre_completo, correo_electronico, telefono, direccion, password, es_admin) VALUES (?, ?, ?, ?, ?, ?, ?)', [user.cedula, user.nombre_completo, user.correo_electronico, user.telefono, user.direccion, passwordHashed, user.es_admin])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static async update (id, user) {
    const passwordHashed = await password.hashPassword(user.password)
    return new Promise((resolve, reject) => {
      pool.query('UPDATE usuarios SET cedula = ?, nombre_completo = ?, correo_electronico = ?, telefono = ?, direccion = ?, password = ?, es_admin = ? WHERE id = ?', [user.cedula, user.nombre_completo, user.correo_electronico, user.telefono, user.direccion, passwordHashed, user.es_admin, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static delete (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM usuarios WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default User
