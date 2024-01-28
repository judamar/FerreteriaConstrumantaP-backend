import pool from '../database/db.js'
import productKeyGenerator from '../utils/productKey.js'
import { imageToURL } from '../utils/images.js'

class Product {
  static async create (product, image) {
    const claveProducto = productKeyGenerator(product.nombre_producto, product.marca)
    const urlImage = await imageToURL(image)
    return await pool.query('INSERT INTO productos (nombre_producto, clave_producto, url_imagen, marca, descripcion, precio, cantidad, categorias_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [product.nombre_producto, claveProducto, urlImage, product.marca.toUpperCase(), product.descripcion, product.precio, product.cantidad, product.categorias_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT p.id AS producto_id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id WHERE p.id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByName (name) {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id WHERE nombre_producto LIKE ?', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByCategory (category) {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id WHERE categorias_id = ?', [category])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByKey (key) {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria FROM productos p JOIN categorias c ON p.categorias_id = c.id WHERE clave_producto = ?', [key])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, product) {
    const claveProducto = productKeyGenerator(product.nombre_producto, product.marca)
    return await pool.query('UPDATE productos SET nombre_producto = ?, clave_producto = ?, marca = ?, descripcion = ?, precio = ?, cantidad = ?, categorias_id = ? WHERE id = ?', [product.nombre_producto, claveProducto, product.marca.toUpperCase(), product.descripcion, product.precio, product.cantidad, product.categorias_id, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async updateImage (id, image) {
    const urlImage = await imageToURL(image)
    return await pool.query('UPDATE productos SET url_imagen = ? WHERE id = ?', [urlImage, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM productos WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Product
