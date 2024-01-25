import { Router } from 'express'
import Suggestion from '../controllers/suggestions.controller.js'

const SuggestionRouter = Router()

SuggestionRouter
  .post('/', Suggestion.create)
  .get('/', Suggestion.getAll)
  .get('/:id', Suggestion.getById)
  .put('/:id', Suggestion.update)
  .delete('/:id', Suggestion.remove)

export default SuggestionRouter
