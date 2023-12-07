const getAllProducts = (req, res) => {
  res.send('Get all products')
}

const getOneProduct = (req, res) => {
  res.send(`Get one product ${req.params.productId}`)
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
