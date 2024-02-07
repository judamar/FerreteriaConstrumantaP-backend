import pool from '../database/db.js'

/* The Provider class is a JavaScript class that provides methods for creating, retrieving, updating,
and deleting providers in a database. */
class Provider {
  static async create (provider) {
    return await pool.query('INSERT INTO proveedores (NIT, nombre_proveedor, direccion_proveedor, telefono_proveedor, correo_proveedor, telefono_vendedor) VALUES (?, ?, ?, ?, ?, ?)', [provider.NIT, provider.nombre_proveedor, provider.direccion_proveedor, provider.telefono_proveedor, provider.correo_proveedor, provider.telefono_vendedor])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT p.id AS proveedor_id, p.NIT, p.nombre_proveedor, p.direccion_proveedor, p.telefono_proveedor, p.correo_proveedor, p.telefono_vendedor, COALESCE(GROUP_CONCAT(c.categoria), "") AS categorias FROM proveedores p LEFT JOIN proveedores_has_categorias pc ON p.id = pc.proveedores_id LEFT JOIN categorias c ON pc.categorias_id = c.id GROUP BY p.id')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT p.id AS proveedor_id, p.NIT, p.nombre_proveedor, p.direccion_proveedor, p.telefono_proveedor, p.correo_proveedor, p.telefono_vendedor, COALESCE(GROUP_CONCAT(c.categoria), "") AS categorias FROM proveedores p LEFT JOIN proveedores_has_categorias pc ON p.id = pc.proveedores_id LEFT JOIN categorias c ON pc.categorias_id = c.id WHERE p.id = ? GROUP BY p.id', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByName (name) {
    return await pool.query('SELECT p.id AS proveedor_id, p.NIT, p.nombre_proveedor, p.direccion_proveedor, p.telefono_proveedor, p.correo_proveedor, p.telefono_vendedor, COALESCE(GROUP_CONCAT(c.categoria), "") AS categorias FROM proveedores p LEFT JOIN proveedores_has_categorias pc ON p.id = pc.proveedores_id LEFT JOIN categorias c ON pc.categorias_id = c.id WHERE p.nombre_proveedor LIKE ? GROUP BY p.id', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByNIT (NIT) {
    /* The Reservation class is a JavaScript class that provides methods for creating, retrieving,
    updating, and deleting reservations in a database. */
    return await pool.query('SELECT p.id AS proveedor_id, p.NIT, p.nombre_proveedor, p.direccion_proveedor, p.telefono_proveedor, p.correo_proveedor, p.telefono_vendedor, COALESCE(GROUP_CONCAT(c.categoria), "") AS categorias FROM proveedores p LEFT JOIN proveedores_has_categorias pc ON p.id = pc.proveedores_id LEFT JOIN categorias c ON pc.categorias_id = c.id WHERE p.NIT = ? GROUP BY p.id', [NIT])
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
