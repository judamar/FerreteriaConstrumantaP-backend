import Category from '../models/category.model.js'

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories()
    res.status(200).json({ categories })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.getCategoryById(req.params.id)
    res.status(200).json({ category })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const insertCategory = async (req, res) => {
  try {
    const category = req.body.categoria
    const result = await Category.createCategory(category)
    res.status(201).json({ status: 'OK', category: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = req.body.categoria
    const result = await Category.updateCategory(req.params.id, category)
    res.status(201).json({ status: 'OK', category: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const result = await Category.deleteCategory(req.params.id)
    res.status(200).json({ status: 'OK', category: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory
}
