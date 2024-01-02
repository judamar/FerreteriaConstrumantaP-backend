import { Router } from 'express'
import ProvidersHasCategories from '../controllers/providers_has_categories.controller.js'

const ProviderHasCategoryRouter = Router()

ProviderHasCategoryRouter
  .get('/', ProvidersHasCategories.getAll)
  .get('/:id', ProvidersHasCategories.getById)
  .post('/', ProvidersHasCategories.insert)
  .put('/:id', ProvidersHasCategories.update)
  .delete('/:id', ProvidersHasCategories.remove)

export default ProviderHasCategoryRouter
