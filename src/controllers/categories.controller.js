import Category from '../models/category.model.js'

const getAll = async (req, res) => {
  try {
    const categories = await Category.getAll()
    if (!categories) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'Categories not found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', categories })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.getById(id)
    if (!category) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'Category not found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', category })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const getByName = async (req, res) => {
  const name = req.params.name
  try {
    const category = await Category.getByName(name)
    if (!category) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'Category not found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', category })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const insert = async (req, res) => {
  const category = req.body.category
  try {
    const result = await Category.createCategory(category)
    res.status(201).json({ status: 'RESOURCE_CREATED', category: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const update = async (req, res) => {
  const id = req.params.id
  const category = req.body.category
  try {
    const result = await Category.updateCategory(id, category)
    res.status(201).json({ status: 'RESOURCE_UPDATED', category: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await Category.deleteCategory(id)
    res.status(200).json({ status: 'RESOURCE_DELETED', category: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

export default {
  getAll,
  getById,
  getByName,
  insert,
  update,
  remove
}
