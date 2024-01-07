import ProviderHasCategory from '../models/provider_has_cateogry.model.js'

const getAll = async (req, res) => {
  try {
    const result = await ProviderHasCategory.findAll()
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const result = await ProviderHasCategory.getById(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const insert = async (req, res) => {
  try {
    const result = await ProviderHasCategory.insert(req.body)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const update = async (req, res) => {
  try {
    const result = await ProviderHasCategory.update(req.body, req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await ProviderHasCategory.remove(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default {
  getAll,
  getById,
  insert,
  update,
  remove
}
