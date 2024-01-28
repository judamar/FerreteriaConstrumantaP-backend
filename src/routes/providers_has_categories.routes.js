import { Router } from 'express'
import ProvidersHasCategories from '../controllers/providers_has_categories.controller.js'

const ProviderHasCategoryRouter = Router()

ProviderHasCategoryRouter
  .post('/', ProvidersHasCategories.create)
  .get('/', ProvidersHasCategories.getAll)
  .delete('/:provId', ProvidersHasCategories.remove)

export default ProviderHasCategoryRouter
