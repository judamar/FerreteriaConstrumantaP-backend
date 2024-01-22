import pool from '../database/db.js'

class ProviderHasCategory {
  static create (providerHasCategory) {
    return pool.query('INSERT INTO proveedores_has_categorias (proveedores_id, categorias_id) VALUES (?, ?)', providerHasCategory.proveedores_id, providerHasCategory.categorias_id)
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getAll () {
    return pool.query('SELECT * FROM proveedores_has_categorias')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getById (id) {
    return pool.query('SELECT * FROM proveedores_has_categorias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static update (id, providerHasCategory) {
    return pool.query('UPDATE proveedores_has_categorias SET proveedores_id = ?, categorias_id = ? WHERE id = ?', [providerHasCategory.proveedores_id, providerHasCategory.categorias_id, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static remove (id) {
    return pool.query('DELETE FROM proveedores_has_categorias WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default ProviderHasCategory
