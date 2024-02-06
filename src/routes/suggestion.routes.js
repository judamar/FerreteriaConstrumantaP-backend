import { Router } from 'express'
import Suggestion from '../controllers/suggestions.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const SuggestionRouter = Router()

SuggestionRouter.use(authUser)

SuggestionRouter
  .post('/', Suggestion.create)
  .get('/', authAdmin, Suggestion.getAll)
  .delete('/:id', authAdmin, Suggestion.remove)

export default SuggestionRouter
