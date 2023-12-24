import { Router } from 'express'
import User from '../controllers/users.controller.js'

const UsersRouter = Router()

UsersRouter
  .get('/', User.getAllUsers)
  .get('/:id', User.getUserById)
  .post('/', User.insertUser)
  .put('/:id', User.updateUser)
  .delete('/:id', User.deleteUser)

export default UsersRouter
