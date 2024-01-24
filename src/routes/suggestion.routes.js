import { Router } from 'express'
import Suggestion from '../controllers/suggestions.controller.js'

const SuggestionRouter = Router()

SuggestionRouter
  .get('/', Suggestion.getAll)
  .get('/:id', Suggestion.getById)
  .post('/', Suggestion.create)
  .put('/:id', Suggestion.update)
  .delete('/:id', Suggestion.remove)

export default SuggestionRouter
