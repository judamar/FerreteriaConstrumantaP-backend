import { Router } from 'express'
import Category from '../controllers/category.controller.js'

const CategoryRouter = Router()

CategoryRouter
  .get('/', Category.getAllCategories)
  .get('/:id', Category.getCategoryById)
  .post('/crear', Category.insertCategory)
  .put('/:id', Category.updateCategory)

export default CategoryRouter
