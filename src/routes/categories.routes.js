import { Router } from 'express'
import Category from '../controllers/categories.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const CategoryRouter = Router()

CategoryRouter
  .post('/', authUser, authAdmin, Category.create)
  .get('/', Category.getAll)
  .get('/id/:id', Category.getById)
  .get('/search/:name', Category.getByName)
  .put('/:id', authUser, authAdmin, Category.update)
  .delete('/:id', authUser, authAdmin, Category.remove)

export default CategoryRouter
