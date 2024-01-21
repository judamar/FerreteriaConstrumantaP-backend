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
      console.log(pc.bgRed(''))
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAll = async (req, res) => {
  try {
    const result = await ProviderHasCategory.getAll()
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const result = await ProviderHasCategory.getById(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const update = async (req, res) => {
  try {
    const result = await ProviderHasCategory.update(req.body, req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await ProviderHasCategory.remove(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default {
  getAll,
  getById,
  insert,
  update,
  remove
}
