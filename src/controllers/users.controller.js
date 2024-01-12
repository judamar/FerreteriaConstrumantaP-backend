import User from '../models/user.model.js'

const getAll = async (req, res) => {
  try {
    const users = await User.getAll()
    if (!users) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'No users found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', users })
    }
  } catch (error) {
    res.status(404).json({ status: 'ERROR', error: error.message })
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.getById(id)
    if (!user) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'User not found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', user })
    }
  } catch (error) {
    res.status(404).json({ status: 'ERROR', error: error.message })
  }
}

const getByCedula = async (req, res) => {
  const cedula = req.params.cedula
  try {
    const user = await User.getByCedula(cedula)
    if (!user) {
      res.status(404).json({ status: 'NOT_FOUND', error: 'User not found' })
    } else {
      res.status(200).json({ status: 'SUCCESS', user })
    }
  } catch (error) {
    res.status(404).json({ status: 'ERROR', error: error.message })
  }
}

const insert = async (req, res) => {
  const user = req.body.user
  try {
    const result = await User.create(user)
    if (!result) {
      res.status(500).json({ status: 'ERROR', error: 'User not created' })
    } else {
      res.status(201).json({ status: 'RESOURCE_CREATED', user: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const updateById = async (req, res) => {
  const id = req.params.id
  const user = req.body.user
  try {
    const result = await User.updateById(id, user)
    if (!result) {
      res.status(500).json({ status: 'ERROR', error: 'User not updated' })
    } else {
      res.status(201).json({ status: 'RESOURCE_UPDATED', user: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const updateByCedula = async (req, res) => {
  const cedula = req.params.cedula
  const user = req.body.user
  try {
    const result = await User.updateByCedula(cedula, user)
    if (!result) {
      res.status(500).json({ status: 'ERROR', error: 'User not updated' })
    } else {
      res.status(201).json({ status: 'RESOURCE_UPDATED', user: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const remove = async (req, res) => {
  const id = req.params.id
  try {
    const result = await User.delete(id)
    if (!result) {
      res.status(500).json({ status: 'ERROR', error: 'User not deleted' })
    } else {
      res.status(200).json({ status: 'RESOURCE_DELETED', user: result })
    }
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
