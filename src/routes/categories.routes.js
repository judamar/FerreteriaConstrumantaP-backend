import { Router } from 'express'
import Category from '../controllers/category.controller.js'

const CategoryRouter = Router()

CategoryRouter
  .post('/:Category', Category.insertCategory)

export default CategoryRouter
