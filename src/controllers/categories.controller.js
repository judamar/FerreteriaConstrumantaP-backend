import Category from '../models/category.model.js'

const getAll = async (req, res) => {
  try {
    const categories = await Category.getAll()
    res.status(200).json({ status: 'OK', categories })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id)
    res.status(200).json({ status: 'OK', category })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const getByName = async (req, res) => {
  try {
    const category = await Category.getByName(req.params.name)
    res.status(200).json({ status: 'OK', category })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const insert = async (req, res) => {
  try {
    const category = req.body.categoria
    const result = await Category.createCategory(category)
    res.status(201).json({ status: 'OK', category: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const category = req.body.categoria
    const result = await Category.updateCategory(req.params.id, category)
    res.status(201).json({ status: 'OK', category: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await Category.deleteCategory(req.params.id)
    res.status(200).json({ status: 'OK', category: result })
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
