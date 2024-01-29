import { Router } from 'express'
import Suggestion from '../controllers/suggestions.controller.js'

const SuggestionRouter = Router()

SuggestionRouter
  .post('/', Suggestion.create)
  .get('/', Suggestion.getAll)
  .delete('/:id', Suggestion.remove)

export default SuggestionRouter
