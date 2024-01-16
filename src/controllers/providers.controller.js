import Provider from '../models/provider.model.js'
import { handleSuccess, handleNotFound, handleServerError, handleBadRequest } from '../utils/handles.js'

const create = async (req, res) => {
  try {
    const provider = req.body.proveedor
    const result = await Provider.create(provider)
    result && result.affectedRows === 1 ? handleSuccess(res, 201, result) : handleBadRequest(res, 'Provider not created.')
  } catch (error) {
    error.message.includes('cannot be null') ? handleBadRequest(res, `Missing or invalid value for field: ${/Column '([^']*)'/.exec(error.message)[1] || 'Unknown'}`) : handleServerError(res, error.message)
  }
}

const getAll = async (req, res) => {
  try {
    const providers = await Provider.getAll()
    providers && providers.length > 0 ? handleSuccess(res, 200, providers) : handleNotFound(res, 'No providers found.')
  } catch (error) {
    handleBadRequest(res, error.message)
  }
}

const getById = async (req, res) => {
  try {
    const provider = await Provider.getById(req.params.id)
    provider && provider.length > 0 ? handleSuccess(res, 200, provider) : handleNotFound(res, 'Provider not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByName = async (req, res) => {
  try {
    const provider = await Provider.getByName(req.params.name)
    provider && provider.length > 0 ? handleSuccess(res, 200, provider) : handleNotFound(res, 'Provider not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const getByNIT = async (req, res) => {
  try {
    const provider = await Provider.getByNIT(req.params.nit)
    provider && provider.length > 0 ? handleSuccess(res, 200, provider) : handleNotFound(res, 'Provider not found.')
  } catch (error) {
    handleServerError(res, error.message)
  }
}

const update = async (req, res) => {
  try {
    const provider = req.body.proveedor
    const result = await Provider.update(req.params.id, provider)
    result && result.affectedRows > 0 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Provider not updated.')
  } catch (error) {
    error.message.includes('cannot be null') ? handleBadRequest(res, `Missing or invalid value for field: ${/Column '([^']*)'/.exec(error.message)[1] || 'Unknown'}`) : handleServerError(res, error.message)
  }
}

const remove = async (req, res) => {
  try {
    const result = await Provider.remove(req.params.id)
    result && result.affectedRows === 1 ? handleSuccess(res, 200, result) : handleBadRequest(res, 'Provider not deleted.')
  } catch (error) {
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
