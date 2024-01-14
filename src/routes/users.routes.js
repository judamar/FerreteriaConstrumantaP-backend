import { Router } from 'express'
import User from '../controllers/users.controller.js'

const UsersRouter = Router()

UsersRouter
  .get('/', User.getAll)
  .get('/id/:id', User.getById)
  .get('/cedula/:cedula', User.getByCedula)
  .post('/', User.insert)
  .put('/:id', User.update)
  .delete('/:id', User.remove)

export default UsersRouter
