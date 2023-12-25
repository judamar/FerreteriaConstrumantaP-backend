import pool from '../database/db.js'
import password from '../utils/password.js'

class User {
  static getAllUsers () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM usuarios')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getUserById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static async createUser (user) {
    const passwordHashed = await password.hashPassword(user.password)
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO usuarios(nombre_completo, correo_electronico, telefono, direccion, password, es_admin) VALUES (?, ?, ?, ?, ?, ?)', [user.nombre_completo, user.correo_electronico, user.telefono, user.direccion, passwordHashed, user.es_admin])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateUser (id, user) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE usuarios SET nombre_completo = ?, correo_electronico = ?, telefono = ?, direccion = ?, password = ?, es_admin = ? WHERE id = ?', [user.nombre_completo, user.correo_electronico, user.telefono, user.es_admin, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteUser (id) {
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
