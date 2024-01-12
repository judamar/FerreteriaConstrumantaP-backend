import Product from '../models/product.model.js'

const getAll = async (req, res) => {
  try {
    const products = await Product.getAll()
    if (!products) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'Products not found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', products })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id)
    if (!product) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'Product not found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', product })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const getByName = async (req, res) => {
  const name = req.params.name
  try {
    const product = await Product.getByName(name)
    if (!product) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'Product not found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', product })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const createNewProduct = (req, res) => {
  try {
    const product = req.body.product
    const result = Product.insertProduct(product)
    if (!result) {
      res.status(400).json({ status: 'ERROR', error: 'Product not created' })
    } else {
      res.status(201).json({ status: 'RESOURCE_CREATED', product: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })

  }
}

const updateOneProduct = (req, res) => {
  try {
    const product = req.body.product
    const result = Product.updateProduct(req.params.id, product)
    if (!result) {
      res.status(500).json({ status: 'ERROR', error: 'Product not updated' })
    } else {
      res.status(200).json({ status: 'RESOURCE_UPDATED', product: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const deleteOneProduct = (req, res) => {
  try {
    const result = Product.deleteProduct(req.params.id)
    if (!result) {
      res.status(500).json({ status: 'ERROR', error: 'Product not deleted' })
    } else {
      res.status(200).json({ status: 'RESOURCE_DELETED', product: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

export default {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct
}
