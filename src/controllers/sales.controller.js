import Sales from '../models/sales.model.js'

const getAll = async (req, res) => {
  try {
    const result = await Sales.getAll()
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

const getById = async (req, res) => {
  try {
    const result = await Sales.getById(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

const insert = async (req, res) => {
  try {
    const result = await Sales.create(req.body)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

const update = async (req, res) => {
  try {
    const result = await Sales.update(req.params.id, req.body)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

const remove = async (req, res) => {
  try {
    const result = await Sales.delete(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

export default {
  getAll,
  getById,
  insert,
  update,
  remove
}
