import pool from '../database/db.js'

class Provider {
  static create (provider) {
    return pool.query('INSERT INTO proveedores (NIT, nombre_proveedor, direccion_proveedor, telefono_proveedor, correo_proveedor, telefono_vendedor) VALUES (?, ?, ?, ?, ?, ?)', [provider.NIT, provider.nombre_proveedor, provider.direccion_proveedor, provider.telefono_proveedor, provider.correo_proveedor, provider.telefono_vendedor])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getAll () {
    return pool.query('SELECT * FROM proveedores')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getById (id) {
    return pool.query('SELECT * FROM proveedores WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getByName (name) {
    return pool.query('SELECT * FROM proveedores WHERE nombre_proveedor LIKE ?', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getByNIT (NIT) {
    return pool.query('SELECT * FROM proveedores WHERE NIT = ?', [NIT])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static update (id, provider) {
    return pool.query('UPDATE proveedores SET NIT = ?, nombre_proveedor = ?, direccion_proveedor = ?, telefono_proveedor = ?, correo_proveedor = ?, telefono_vendedor = ? WHERE id = ?', [provider.NIT, provider.nombre_proveedor, provider.direccion_proveedor, provider.telefono_proveedor, provider.correo_proveedor, provider.telefono_vendedor, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static remove (id) {
    return pool.query('DELETE FROM proveedores WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Provider
