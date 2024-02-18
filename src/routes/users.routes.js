import { Router } from 'express'
import User from '../controllers/users.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const UsersRouter = Router()

/* `UsersRouter` is a router object that handles various routes related to user management. It defines
routes for signing up, logging in, getting all users, getting a user by ID or cedula, updating a
user's information or password, and deleting a user. It also includes middleware functions
`authUser` and `authAdmin` to authenticate and authorize user access to certain routes. */
UsersRouter
  .post('/signup/', User.signup)
  .post('/login/', User.login)
  .get('/', authUser, authAdmin, User.getAll)
  .get('/id/:id', authUser, authAdmin, User.getById)
  .get('/cedula/:cedula', authUser, authAdmin, User.getByCedula)
  .put('/:id', authUser, authAdmin, User.update)
  .patch('/:id', authUser, authAdmin, User.updatePassword)
  .delete('/:id', authUser, authAdmin, User.remove)

export default UsersRouter
