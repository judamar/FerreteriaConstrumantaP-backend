import pool from '../database/db.js'

class ProviderHasCategory {
  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM proveedores_has_categorias')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM proveedores_has_categorias WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  create (providerHasCategory) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO proveedores_has_categorias (proveedores_id, categorias_id) VALUES (?, ?)', providerHasCategory.proveedores_id, providerHasCategory.categorias_id)
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  update (id, providerHasCategory) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE proveedores_has_categorias SET proveedores_id = ?, categorias_id = ? WHERE id = ?', providerHasCategory.proveedores_id, providerHasCategory.categorias_id, id)
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM proveedores_has_categorias WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(err => reject(err))
    })
  }
}

export default ProviderHasCategory
