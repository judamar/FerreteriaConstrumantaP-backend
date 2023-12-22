import pool from '../database/db.js'

class Product {
  static getAllProducts () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM producto')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => reject(error))
    })
  }

  static getProductById (id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM producto WHERE id = ?', [id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static insertProduct (product) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO producto (nombre_producto, clave_producto, url_imagen, marca, descripcion, precio, cantidad, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [product.nombre_producto, product.clave_producto, product.url_imagen, product.marca, product.descripcion, product.precio, product.cantidad, product.categoria_id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static updateProduct (id, product) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE producto SET nombre_producto = ?, clave_producto = ?, url_imagen = ?, marca = ?, descripcion = ?, precio = ?, cantidad = ?, categoria_id = ? WHERE id = ?', [product.nombre_producto, product.clave_producto, product.url_imagen, product.marca, product.descripcion, product.precio, product.cantidad, product.categoria_id, id])
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static deleteProduct (id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM producto WHERE id = ?', [id])
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
