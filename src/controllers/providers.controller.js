import Provider from '../models/provider.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'
import pc from 'picocolors'

// create provider
const create = async (req, res) => { // x-www-form-urlencoded or json raw
  const provider = req.body
  try {
    console.log(pc.bgGreen('CREATING PROVIDER'))
    console.log({ Provider: provider })
    const result = await Provider.create(provider)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PROVIDER CREATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 201, result)
    } else {
      console.log(pc.bgRed('PROVIDER NOT CREATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Provider not created.')
    }
  } catch (error) {
    console.log(pc.bgRed('CREATING PROVIDER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get all providers
const getAll = async (req, res) => {
  try {
    console.log(pc.bgGreen('GETTING PROVIDERS'))
    const providers = await Provider.getAll()
    if (providers && providers.length > 0) {
      console.log(pc.bgGreen('PROVIDERS FOUND'))
      handleSuccess(res, 200, providers)
    } else {
      console.log(pc.bgRed('PROVIDERS NOT FOUND'))
      console.log({ Providers: providers })
      handleNotFound(res, 'Providers not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING PROVIDERS FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get provider by id
const getById = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('GETTING PROVIDER'))
    console.log({ Id: id })
    const provider = await Provider.getById(id)
    if (provider && provider.length > 0) {
      console.log(pc.bgGreen('PROVIDER FOUND'))
      handleSuccess(res, 200, provider)
    } else {
      console.log(pc.bgRed('PROVIDER NOT FOUND'))
      console.log({ Provider: provider })
      handleNotFound(res, 'Provider not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING PROVIDER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get provider by name (search)
const getByName = async (req, res) => {
  const name = req.params.name
  try {
    console.log(pc.bgGreen('GETTING PROVIDER'))
    console.log({ Name: name })
    const provider = await Provider.getByName(name)
    if (provider && provider.length > 0) {
      console.log(pc.bgGreen('PROVIDER FOUND'))
      handleSuccess(res, 200, provider)
    } else {
      console.log(pc.bgRed('PROVIDER NOT FOUND'))
      console.log({ Provider: provider })
      handleNotFound(res, 'Provider not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING PROVIDER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// get provider by NIT
const getByNIT = async (req, res) => {
  const nit = req.params.nit
  try {
    console.log(pc.bgGreen('GETTING PROVIDER'))
    console.log({ NIT: nit })
    const provider = await Provider.getByNIT(nit)
    if (provider && provider.length > 0) {
      console.log(pc.bgGreen('PROVIDER FOUND'))
      handleSuccess(res, 200, provider)
    } else {
      console.log(pc.bgRed('PROVIDER NOT FOUND'))
      console.log({ Provider: provider })
      handleNotFound(res, 'Provider not found.')
    }
  } catch (error) {
    console.log(pc.bgRed('GETTING PROVIDER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// update provider (update all fields)
const update = async (req, res) => { // x-www-form-urlencoded or json raw
  const provider = req.body
  const id = req.params.id
  try {
    console.log(pc.bgGreen('UPDATING PROVIDER'))
    console.log({ Provider: provider })
    console.log({ Id: id })
    const result = await Provider.update(id, provider)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PROVIDER UPDATED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('PROVIDER NOT UPDATED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Provider not updated.')
    }
  } catch (error) {
    console.log(pc.bgRed('UPDATING PROVIDER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

// remove provider
const remove = async (req, res) => {
  const id = req.params.id
  try {
    console.log(pc.bgGreen('DELETING PROVIDER'))
    console.log({ Id: id })
    const result = await Provider.remove(id)
    if (result && result.affectedRows > 0) {
      console.log(pc.bgGreen('PROVIDER DELETED SUCCESFULLY'))
      console.log({ Result: result })
      handleSuccess(res, 200, result)
    } else {
      console.log(pc.bgRed('PROVIDER NOT DELETED'))
      console.log({ Result: result })
      handleBadRequest(res, 'Provider not deleted.')
    }
  } catch (error) {
    console.log(pc.bgRed('DELETING PROVIDER FAILED'))
    console.error({ Error: error.message })
    handleServerError(res, error.message)
  }
}

export default {
  create,
  getAll,
  getById,
  getByName,
  getByNIT,
  update,
  remove
}
