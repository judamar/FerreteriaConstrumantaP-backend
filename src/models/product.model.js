import pool from '../database/db.js'

class Product {
  static create (product) {
    return pool.query('INSERT INTO productos (nombre_producto, clave_producto, url_imagen, marca, descripcion, precio, cantidad, categorias_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [product.nombre_producto, product.clave_producto, product.url_imagen, product.marca, product.descripcion, product.precio, product.cantidad, product.categorias_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getAll () {
    return pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getById (id) {
    return pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getByName (name) {
    return pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id WHERE nombre_producto = ?', [name])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getByCategory (category) {
    return pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id WHERE categorias_id = ?', [category])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static getByKey (key) {
    return pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id WHERE clave_producto = ?', [key])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static update (id, product) {
    return pool.query('UPDATE productos SET nombre_producto = ?, clave_producto = ?, url_imagen = ?, marca = ?, descripcion = ?, precio = ?, cantidad = ?, categorias_id = ? WHERE id = ?', [product.nombre_producto, product.clave_producto, product.url_imagen, product.marca, product.descripcion, product.precio, product.cantidad, product.categorias_id, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static remove (id) {
    return pool.query('DELETE FROM productos WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Product
