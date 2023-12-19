import { Router } from 'express'
import Category from '../controllers/categories.controller.js'

const CategoryRouter = Router()

CategoryRouter
  .get('/', Category.getAllCategories)
  .get('/:id', Category.getCategoryById)
  .post('/crear', Category.insertCategory)
  .put('/:id', Category.updateCategory)
  .delete('/:id', Category.deleteCategory)

export default CategoryRouter
