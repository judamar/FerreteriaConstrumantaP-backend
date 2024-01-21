import ProviderHasCategory from '../models/provider_has_cateogry.model.js'
import { handleSuccess, handleBadRequest, handleNotFound, handleServerError } from '../utils/handles.js'
import pc from 'picocolors'

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

const getById = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING PROVIDER HAS CATEGORY RELATION BY ID'))
    console.log({ ID: req.params.id })
    const result = await ProviderHasCategory.getById(req.params.id)
    if (result && result.length > 0) {
      console.log(pc.bgGreen('PROVIDER HAS CATEGORY RELATION FOUND'))
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('PROVIDER HAS CATEGORY RELATION NOT FOUND'))
      console.log({ Result: result })
      handleNotFound(res, 'Relation not found')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING PROVIDER HAS CATEGORY RELATION BY ID FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const update = async (req, res) => {
  const provHasCategory = req.body
  const id = req.params.id
  try {
    console.log(pc.bgGreen('UPDATING PROVIDER HAS CATEGORY RELATION'))
    console.log({ Relation: provHasCategory, ID: id })
    const result = await ProviderHasCategory.update(provHasCategory, id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PROVIDER HAS CATEGORY RELATION UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('PROVIDER HAS CATEGORY RELATION NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Relation not updated')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING PROVIDER HAS CATEGORY RELATION FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  const id = req.params.id
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
  getById,
  update,
  remove
}
