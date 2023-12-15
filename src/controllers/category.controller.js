import Category from '../models/category.model.js'

const insertCategory = async (req, res) => {
  try {
    const category = await Category.createCategory(req.body)
    res.status(201).json({ category })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await Category.updateCategory(req.body)
    res.status(201).json({ category })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  insertCategory,
  updateCategory
}
