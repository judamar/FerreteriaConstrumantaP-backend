import ProviderHasCategory from '../models/provider_has_cateogry.model.js'
import { handleSuccess, handleBadRequest, handleNotFound, handleServerError } from '../utils/handles.js'
import pc from 'picocolors'

// create relation providers-categories
const create = async (req, res) => {
  const provHasCategory = req.body
  try {
    console.log(pc.bgGreen('CREATING PROVIDER HAS CATEGORY RELATION'))
    console.log({ Relation: provHasCategory })
    const result = await ProviderHasCategory.create(provHasCategory)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PROVIDER HAS CATEGORY RELATION CREATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('PROVIDER HAS CATEGORY RELATION NOT CREATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Relation not created')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING PROVIDER HAS CATEGORY RELATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get all relations
const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING ALL PROVIDER HAS CATEGORY RELATIONS'))
    const result = await ProviderHasCategory.getAll()
    if (result && result.length > 0) {
      console.log(pc.bgGreen('PROVIDER HAS CATEGORY RELATIONS FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('PROVIDER HAS CATEGORY RELATIONS NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'Relations not found')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING ALL PROVIDER HAS CATEGORY RELATIONS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// remove relation
const remove = async (req, res) => {
  const id = req.params.provId
  try {
    console.log(pc.bgGreen('REMOVING PROVIDER HAS CATEGORY RELATION'))
    console.log({ ID: id })
    const result = await ProviderHasCategory.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PROVIDER HAS CATEGORY RELATION REMOVED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('PROVIDER HAS CATEGORY RELATION NOT REMOVED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Relation not removed')
    }
  } catch (error) {
    console.log(pc.bgRed('REMOVING PROVIDER HAS CATEGORY RELATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

export default {
  create,
  getAll,
  remove
}
