import { Router } from 'express'
import Category from '../controllers/categories.controller.js'
import authUser from '../middlewares/authUser.js'

const CategoryRouter = Router()

CategoryRouter
  .post('/', authUser.authAdmin, Category.create)
  .get('/', Category.getAll)
  .get('/id/:id', Category.getById)
  .get('/search/:name', Category.getByName)
  .put('/:id', Category.update)
  .delete('/:id', Category.remove)

export default CategoryRouter
