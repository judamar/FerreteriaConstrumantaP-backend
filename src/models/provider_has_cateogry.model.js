import pool from '../database/db.js'

/* The ProviderHasCategory class is a JavaScript class that provides methods for creating, retrieving,
and removing records from a database table called proveedores_has_categorias. */
/* The above class is a JavaScript class that provides methods for creating, retrieving, updating, and
deleting products in a database. */
class ProviderHasCategory {
  static async create (providerHasCategory) {
    return await pool.query('INSERT INTO ferre_c_proveedores_has_categorias (proveedores_id, categorias_id) VALUES (?, ?)', [providerHasCategory.proveedores_id, providerHasCategory.categorias_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM ferre_c_proveedores_has_categorias')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (provId) {
    return await pool.query('DELETE FROM ferre_c_proveedores_has_categorias WHERE proveedores_id = ?', [provId])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default ProviderHasCategory
