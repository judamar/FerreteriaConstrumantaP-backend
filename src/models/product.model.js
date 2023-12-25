import pool from '../database/db.js'

class Product {
  static getAllProducts () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.marca, p.descripcion, p.precio, p.cantidad, p.url_imagen, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categoria_id = c.id')
        .then(([rows, fields]) => {
          resolve(rows)
        })
        .catch(error => reject(error))
    })
  }

  static getProductById (id) {
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

  static insertProduct (product) {
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

  static updateProduct (id, product) {
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

  static deleteProduct (id) {
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
