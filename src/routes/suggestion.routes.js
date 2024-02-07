import { Router } from 'express'
import Suggestion from '../controllers/suggestions.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const SuggestionRouter = Router()

// Middleware for authenticathe the user
SuggestionRouter.use(authUser)

/* `SuggestionRouter` is a router object that handles the routes related to suggestions. It is
responsible for defining the routes for creating, getting all, and removing suggestions. It also
includes middleware to authenticate the user and check if the user is an admin before allowing
access to certain routes. */
SuggestionRouter
  .post('/', Suggestion.create)
  .get('/', authAdmin, Suggestion.getAll)
  .delete('/:id', authAdmin, Suggestion.remove)

export default SuggestionRouter
