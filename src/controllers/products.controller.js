import Product from '../models/product.model.js'

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts()
    res.status(200).json({ status: 'OK', products })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ status: 'OK', product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createNewProduct = (req, res) => {
  try {
    const product = req.body.product
    const result = Product.insertProduct(product)
    res.status(201).json({ status: 'OK', product: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateOneProduct = (req, res) => {
  try {
    const product = req.body.product
    const result = Product.updateProduct(req.params.id, product)
    res.status(201).json({ status: 'OK', product: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteOneProduct = (req, res) => {
  try {
    const result = Product.deleteProduct(req.params.id)
    res.status(200).json({ status: 'OK', product: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct
}
