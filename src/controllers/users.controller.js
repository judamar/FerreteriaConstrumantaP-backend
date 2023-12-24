import User from '../models/user.model.js'

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.status(200).json({ status: 'OK', users })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id)
    res.status(200).json({ status: 'OK', user })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const insertUser = async (req, res) => {
  try {
    const user = req.body.usuario
    const result = await User.createUser(user)
    res.status(201).json({ status: 'OK', user: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = req.body.usuario
    const result = await User.updateUser(req.params.id, user)
    res.status(201).json({ status: 'OK', user: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteUser(req.params.id)
    res.status(200).json({ status: 'OK', user: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser
}
