import { Router } from 'express'
import Category from '../controllers/categories.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const CategoryRouter = Router()

/* `CategoryRouter` is a router object that handles different HTTP requests related to categories. It
defines various routes for creating, getting, updating, and deleting categories. It also includes
middleware functions `authUser` and `authAdmin` to authenticate the user and check if they have
admin privileges before allowing access to certain routes. */
CategoryRouter
  .post('/', authUser, authAdmin, Category.create)
  .get('/', Category.getAll)
  .get('/id/:id', Category.getById)
  .get('/search/:name', Category.getByName)
  .put('/:id', authUser, authAdmin, Category.update)
  .delete('/:id', authUser, authAdmin, Category.remove)

export default CategoryRouter
