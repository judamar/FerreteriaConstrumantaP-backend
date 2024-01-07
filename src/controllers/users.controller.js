import User from '../models/user.model.js'

const getAll = async (req, res) => {
  try {
    const users = await User.getAll()
    res.status(200).json({ status: 'OK', users })
  } catch (error) {
    res.status(404).json({ status: 'ERROR', error: error.message })
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.getById(id)
    res.status(200).json({ status: 'OK', user })
  } catch (error) {
    res.status(404).json({ status: 'ERROR', error: error.message })
  }
}

const getByCedula = async (req, res) => {
  const cedula = req.params.cedula
  try {
    const user = await User.getByCedula(cedula)
    res.status(200).json({ status: 'OK', user })
  } catch (error) {
    res.status(404).json({ status: 'ERROR', error: error.message })
  }
}

const insert = async (req, res) => {
  const user = req.body.user
  try {
    const result = await User.create(user)
    res.status(201).json({ status: 'OK', user: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const updateById = async (req, res) => {
  const id = req.params.id
  const user = req.body.user
  try {
    const result = await User.updateById(id, user)
    res.status(201).json({ status: 'OK', user: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const updateByCedula = async (req, res) => {
  const cedula = req.params.cedula
  const user = req.body.user
  try {
    const result = await User.updateByCedula(cedula, user)
    res.status(201).json({ status: 'OK', user: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await User.delete(id)
    res.status(200).json({ status: 'OK', user: result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

export default {
  getAll,
  getById,
  getByCedula,
  insert,
  updateById,
  updateByCedula,
  remove
}
