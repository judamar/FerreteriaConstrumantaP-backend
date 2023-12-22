import { Router } from 'express'
import Suggestion from '../controllers/suggestions.controller.js'

const SuggestionRouter = Router()

SuggestionRouter
  .get('/', Suggestion.getAllSuggestions)
  .get('/:id', Suggestion.getSuggestionById)
  .post('/', Suggestion.insertSuggestion)
  .put('/:id', Suggestion.updateSuggestion)
  .delete('/:id', Suggestion.deleteSuggestion)

export default SuggestionRouter
