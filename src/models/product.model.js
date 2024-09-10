import pool from '../database/db.js'
import productKeyGenerator from '../utils/productKey.js'
import { imageToURL } from '../utils/images.js'

/* The above class is a JavaScript class that provides methods for creating, retrieving, updating, and
deleting products in a database. */
class Product {
  static async create (product, image) {
    const claveProducto = productKeyGenerator(product.nombre_producto, product.marca)
    const urlImage = await imageToURL(image)
    return await pool.query('INSERT INTO ferre_c_productos (nombre_producto, clave_producto, url_imagen, marca, descripcion, precio, cantidad, categorias_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [product.nombre_producto, claveProducto, urlImage, product.marca.toUpperCase(), product.descripcion, product.precio, product.cantidad, product.categorias_id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getAll () {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria, c.id AS categoria_id FROM ferre_c_productos p JOIN ferre_c_categorias c ON p.categorias_id = c.id ORDER BY p.nombre_producto ASC')
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getById (id) {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria, c.id AS categoria_id FROM ferre_c_productos p JOIN ferre_c_categorias c ON p.categorias_id = c.id WHERE p.id = ? ORDER BY p.nombre_producto ASC', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByName (name) {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria, c.id AS categoria_id FROM ferre_c_productos p JOIN ferre_c_categorias c ON p.categorias_id = c.id WHERE nombre_producto LIKE ? ORDER BY p.nombre_producto ASC', [`%${name}%`])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByCategory (category) {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria, c.id AS categoria_id FROM ferre_c_productos p JOIN ferre_c_categorias c ON p.categorias_id = c.id WHERE categorias_id = ? ORDER BY p.nombre_producto ASC', [category])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async getByKey (key) {
    return await pool.query('SELECT p.id, p.nombre_producto, p.clave_producto, p.url_imagen, p.marca, p.descripcion, p.precio, p.cantidad, c.categoria AS categoria, c.id AS categoria_id FROM ferre_c_productos p JOIN ferre_c_categorias c ON p.categorias_id = c.id WHERE clave_producto = ? ORDER BY p.nombre_producto ASC', [key])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async update (id, product) {
    const claveProducto = productKeyGenerator(product.nombre_producto, product.marca)
    return await pool.query('UPDATE ferre_c_productos SET nombre_producto = ?, clave_producto = ?, marca = ?, descripcion = ?, precio = ?, cantidad = ?, categorias_id = ? WHERE id = ?', [product.nombre_producto, claveProducto, product.marca.toUpperCase(), product.descripcion, product.precio, product.cantidad, product.categorias_id, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async updateImage (id, img) {
    const urlImage = await imageToURL(img)
    return await pool.query('UPDATE ferre_c_productos SET url_imagen = ? WHERE id = ?', [urlImage, id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }

  static async remove (id) {
    return await pool.query('DELETE FROM ferre_c_productos WHERE id = ?', [id])
      .then(([rows, fields]) => rows)
      .catch(err => {
        throw err
      })
  }
}

export default Product
