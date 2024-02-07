import Suggestion from '../models/suggestion.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

// create suggestion
const create = async (req, res) => {
  const suggestion = req.body
  try {
    console.log(pc.bgGreen('CREATING SUGGESTION'))
    console.log({ Suggestion: suggestion })
    const result = await Suggestion.create(suggestion)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SUGGESTION CREATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('CREATING SUGGESTION FAILED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Suggestion not created')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING SUGGESTION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get all suggestions
const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL SUGGESTIONS'))
    const result = await Suggestion.getAll()
    if (result && result.length > 0) {
      console.log(pc.bgGreen('SUGGESTIONS FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SUGGESTIONS NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'No suggestions found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING ALL SUGGESTIONS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// remove suggestion
const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING SUGGESTION'))
    console.log({ Id: id })
    const result = await Suggestion.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('SUGGESTION DELETED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('SUGGESTION NOT DELETED'))
      console.log({ Result: result })
      handleServerError(res, 'Error deleting suggestion')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING SUGGESTION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

export default {
  create,
  getAll,
  remove
}
