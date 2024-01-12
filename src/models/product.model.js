import pool from '../database/db.js'

class Product {
  static getAll () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => reject(error))
    })
  }

  static getById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM productos WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getByName (name) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM productos WHERE nombre_producto = ?', [name])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getByCategory (category) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM productos WHERE categoria = ?', [category])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getByKey (key) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM productos WHERE clave_producto = ?', [key])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static create (product) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO productos (nombre_producto, clave_producto, url_imagen, marca, descripcion, precio, cantidad, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [product.nombre_producto, product.clave_producto, product.url_imagen, product.marca, product.descripcion, product.precio, product.cantidad, product.categoria_id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static update (id, product) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE productos SET nombre_producto = ?, clave_producto = ?, url_imagen = ?, marca = ?, descripcion = ?, precio = ?, cantidad = ?, categoria_id = ? WHERE id = ?', [product.nombre_producto, product.clave_producto, product.url_imagen, product.marca, product.descripcion, product.precio, product.cantidad, product.categoria_id, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static remove (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM productos WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default Product
