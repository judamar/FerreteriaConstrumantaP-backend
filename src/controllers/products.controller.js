import Product from '../models/product.model.js'

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts()
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.productId)
    res.status(200).json({ product })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' })
  }
}

const createNewProduct = (req, res) => {
  res.send(`Create new product ${req.params.productId}`)
}

const updateOneProduct = (req, res) => {
  res.send(`Update product ${req.params.productId}`)
}

const deleteOneProduct = (req, res) => {
  res.send(`Delete product ${req.params.productId}`)
}

export default {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct
}
