import pool from '../database/db.js'

class Provider {
  static getAllProviders () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM proveedor')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static getProviderById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM proveedor WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static createProvider (provider) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO proveedor (NIT, nombre_proveedor, direccion_proveedor, telefono_proveedor, correo_proveedor, telefono_vendedor) VALUES (?, ?, ?, ?, ?, ?)', [provider.NIT, provider.nombre_proveedor, provider.direccion_proveedor, provider.telefono_proveedor, provider.correo_proveedor, provider.telefono_vendedor])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static updateProvider (id, provider) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE proveedor SET NIT = ?, nombre_proveedor = ?, direccion_proveedor = ?, telefono_proveedor = ?, correo_proveedor = ?, telefono_vendedor = ? WHERE id = ?', [provider.NIT, provider.nombre_proveedor, provider.direccion_proveedor, provider.telefono_proveedor, provider.correo_proveedor, provider.telefono_vendedor, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  static deleteProvider (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM proveedor WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default Provider
