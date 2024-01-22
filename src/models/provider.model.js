import pool from '../database/db.js'

class Provider {
  static async create (provider) {
    return await pool.query('INSERT INTO proveedores (NIT, nombre_proveedor, direccion_proveedor, telefono_proveedor, correo_proveedor, telefono_vendedor) VALUES (?, ?, ?, ?, ?, ?)', [provider.NIT, provider.nombre_proveedor, provider.direccion_proveedor, provider.telefono_proveedor, provider.correo_proveedor, provider.telefono_vendedor])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM proveedores')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT * FROM proveedores WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByName (name) {
    return await pool.query('SELECT * FROM proveedores WHERE nombre_proveedor LIKE ?', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByNIT (NIT) {
    return await pool.query('SELECT * FROM proveedores WHERE NIT = ?', [NIT])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, provider) {
    return await pool.query('UPDATE proveedores SET NIT = ?, nombre_proveedor = ?, direccion_proveedor = ?, telefono_proveedor = ?, correo_proveedor = ?, telefono_vendedor = ? WHERE id = ?', [provider.NIT, provider.nombre_proveedor, provider.direccion_proveedor, provider.telefono_proveedor, provider.correo_proveedor, provider.telefono_vendedor, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM proveedores WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Provider
