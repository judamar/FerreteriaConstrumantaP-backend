import { Router } from 'express'
import multer from 'multer'
import Product from '../controllers/products.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

/* The code `const storage = multer.diskStorage({ ... })` is configuring the storage settings for
multer, a middleware used for handling file uploads in Express.js. */
const storage = multer.diskStorage({
  destination: 'src/images/public/',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const ProductRouter = Router()

/* `ProductRouter` is a router object from the Express.js framework. It is used to define the routes
for handling various HTTP requests related to products. The routes include creating a product,
getting all products, getting a product by ID, searching for a product by name, getting products by
category, getting products by key, updating a product, updating a product's image, and deleting a
product. The routes are associated with corresponding controller functions from the `Product`
controller. The routes also include middleware functions for authentication and authorization. */
ProductRouter
  .post('/', authUser, authAdmin, upload.single('image'), Product.create)
  .get('/', Product.getAll)
  .get('/id/:id', Product.getById)
  .get('/search/:name', Product.getByName)
  .get('/category/:category', Product.getByCategory)
  .get('/key/:key', Product.getByKey)
  .put('/:id', authUser, authAdmin, Product.update)
  .patch('/:id', authUser, authAdmin, upload.single('image'), Product.updateImage)
  .delete('/:id', authUser, authAdmin, Product.remove)

export default ProductRouter
