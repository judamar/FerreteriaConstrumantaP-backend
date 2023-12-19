import Provider from '../models/provider.model.js'

const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.getAllProviders()
    res.status(200).json(providers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.getProviderById(req.params.id)
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' })
    }
    res.status(200).json(provider)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const insertProvider = async (req, res) => {
  try {
    const provider = req.body.proveedor
    const result = await Provider.createProvider(provider)
    res.status(201).json({ status: 'OK', provider: result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateProvider = async (req, res) => {
  try {
    const provider = req.body.proveedor
    const result = await Provider.updateProvider(req.params.id, provider)
    res.status(201).json({ status: 'OK', provider: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteProvider = async (req, res) => {
  try {
    const result = await Provider.deleteProvider(req.params.id)
    res.status(200).json({ status: 'OK', provider: result })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getAllProviders,
  getProviderById,
  insertProvider,
  updateProvider,
  deleteProvider
}
