import { Router } from 'express'
import Category from '../controllers/categories.controller.js'

const CategoryRouter = Router()

CategoryRouter
  .get('/', Category.getAll)
  .get('/id/:id', Category.getById)
  .get('/name/:name', Category.getByName)
  .post('/', Category.insert)
  .put('/:id', Category.update)
  .delete('/:id', Category.remove)

export default CategoryRouter
