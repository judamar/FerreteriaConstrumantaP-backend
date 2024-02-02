import { Router } from 'express'
import User from '../controllers/users.controller.js'

const UsersRouter = Router()

UsersRouter
  .post('/signup/', User.signup)
  .post('/login/', User.login)
  .get('/', User.getAll)
  .get('/id/:id', User.getById)
  .get('/cedula/:cedula', User.getByCedula)
  .put('/:id', User.update)
  .patch('/:id', User.updatePassword)
  .delete('/:id', User.remove)

export default UsersRouter
