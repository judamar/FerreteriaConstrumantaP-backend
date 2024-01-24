import Product from '../models/product.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

const create = async (req, res) => {
  const product = {
    nombre_producto: req.body.nombre_producto,
    marca: req.body.marca,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
    categorias_id: req.body.categorias_id,
    image: req.file.filename
  }
  try {
    console.log(pc.bgGreen('CREATING PRODUCT'))
    console.log({ Product: product })
    const image = `src/images/public/${product.image}`
    const result = await Product.create(product, image)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PRODUCT CREATED SUCCESSFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('PRODUCT NOT CREATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Product not created.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR CREATING PRODUCT'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL PRODUCTS'))
    const products = await Product.getAll()
    if (products && products.length > 0) {
      console.log(pc.bgGreen('PRODUCTS FOUND'))
      handleSuccess(res, 200, products)
    } else {
      console.log(pc.bgRed('PRODUCTS NOT FOUND'))
      handleNotFound(res, 'Products not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR GETTING ALL PRODUCTS'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GETTING PRODUCT BY ID'))
    console.log({ ID: id })
    const product = await Product.getById(id)
    if (product && product.length > 0) {
      console.log(pc.bgGreen('PRODUCT FOUND'))
      handleSuccess(res, 200, product)
    } else {
      console.log(pc.bgRed('PRODUCT NOT FOUND'))
      handleNotFound(res, 'Product not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR GETTING PRODUCT BY ID'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getByName = async (req, res) => {
  const name = req.params.name
  try {
    console.log(pc.bgGreen('GETTING PRODUCT BY NAME'))
    console.log({ Name: name })
    const product = await Product.getByName(name)
    if (product && product.length > 0) {
      console.log(pc.bgGreen('PRODUCT FOUND'))
      handleSuccess(res, 200, product)
    } else {
      console.log(pc.bgRed('PRODUCT NOT FOUND'))
      handleNotFound(res, 'Product not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR GETTING PRODUCT BY NAME'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getByCategory = async (req, res) => {
  const category = req.params.category
  try {
    console.log(pc.bgGreen('GETTING PRODUCTS BY CATEGORY'))
    console.log({ Category: category })
    const products = await Product.getByCategory(category)
    if (products && products.length > 0) {
      console.log(pc.bgGreen('PRODUCTS FOUND'))
      handleSuccess(res, 200, products)
    } else {
      console.log(pc.bgRed('PRODUCTS NOT FOUND'))
      handleNotFound(res, 'Products not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR GETTING PRODUCTS BY CATEGORY'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const getByKey = async (req, res) => {
  const key = req.params.key
  try {
    console.log(pc.bgGreen('GETTING PRODUCTS BY KEY'))
    console.log({ Key: key })
    const products = await Product.getByKey(key)
    if (products && products.length > 0) {
      console.log(pc.bgGreen('PRODUCTS FOUND'))
      handleSuccess(res, 200, products)
    } else {
      console.log(pc.bgRed('PRODUCTS NOT FOUND'))
      handleNotFound(res, 'Products not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR GETTING PRODUCTS BY KEY'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const update = async (req, res) => {
  const product = {
    nombre_producto: req.body.nombre_producto,
    marca: req.body.marca,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
    categorias_id: req.body.categorias_id,
    image: req.body.image
  }
  const id = req.params.id
  try {
    console.log(pc.bgGreen('UPDATING PRODUCT'))
    console.log({ Product: product })
    console.log({ ID: id })
    const result = await Product.update(id, product)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PRODUCT UPDATED SUCCESSFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('PRODUCT NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Product not updated.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR UPDATING PRODUCT'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING PRODUCT'))
    console.log({ ID: id })
    const result = await Product.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PRODUCT DELETED SUCCESSFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('PRODUCT NOT DELETED'))
      handleBadRequest(res, 'Product not deleted.')
    }
  } catch (error) {
    console.log(pc.bgRed('ERROR DELETING PRODUCT'))
    console.error({ Error: error.message })
    handleBadRequest(res, error.message)
  }
}

export default {
  create,
  getAll,
  getById,
  getByName,
  getByCategory,
  getByKey,
  update,
  remove
}
