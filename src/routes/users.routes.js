import { Router } from 'express'
import User from '../controllers/users.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const UsersRouter = Router()

UsersRouter
  .post('/signup/', User.signup)
  .post('/login/', User.login)
  .get('/', User.getAll)
  .get('/id/:id', User.getById)
  .get('/cedula/:cedula', User.getByCedula)
  .put('/:id', authUser, authAdmin, User.update)
  .patch('/:id', authUser, authAdmin, User.updatePassword)
  .delete('/:id', authUser, authAdmin, User.remove)

export default UsersRouter
