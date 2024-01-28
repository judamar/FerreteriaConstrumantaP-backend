import pool from '../database/db.js'

class ProviderHasCategory {
  static async create (providerHasCategory) {
    return await pool.query('INSERT INTO proveedores_has_categorias (proveedores_id, categorias_id) VALUES (?, ?)', [providerHasCategory.proveedores_id, providerHasCategory.categorias_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT * FROM proveedores_has_categorias')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (provId) {
    return await pool.query('DELETE FROM proveedores_has_categorias WHERE proveedores_id = ?', [provId])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default ProviderHasCategory
