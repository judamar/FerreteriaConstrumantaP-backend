import { Router } from 'express'
import Provider from '../controllers/providers.controller.js'

const ProviderRouter = Router()

ProviderRouter
  .get('/', Provider.getAllProviders)
  .get('/:id', Provider.getProviderById)
  .post('/', Provider.insertProvider)
  .put('/:id', Provider.updateProvider)
  .delete('/:id', Provider.deleteProvider)

export default ProviderRouter
