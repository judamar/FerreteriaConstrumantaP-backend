import Suggestion from '../models/suggestion.model.js'

const getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.getAllSuggestions()
    res.status(200).json({ status: 'OK', suggestions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getSuggestionById = async (req, res) => {
  try {
    const suggestion = await Suggestion.getCategoryById(req.params.id)
    res.status(200).json({ status: 'OK', suggestion })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const insertSuggestion = async (req, res) => {
  try {
    const suggestion = req.body.sugerencia
    const result = await Suggestion.createSuggestion(suggestion)
    res.status(201).json({ status: 'OK', suggestion: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateSuggestion = async (req, res) => {
  try {
    const suggestion = req.body.sugerencia
    const result = await Suggestion.updateSuggestion(req.params.id, suggestion)
    res.status(201).json({ status: 'OK', suggestion: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteSuggestion = async (req, res) => {
  try {
    const result = await Suggestion.deleteSuggestion(req.params.id)
    res.status(200).json({ status: 'OK', suggestion: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getAllSuggestions,
  getSuggestionById,
  insertSuggestion,
  updateSuggestion,
  deleteSuggestion
}
