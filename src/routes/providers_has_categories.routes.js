import { Router } from 'express'
import ProvidersHasCategories from '../controllers/providers_has_categories.controller.js'

const ProviderHasCategoryRouter = Router()

ProviderHasCategoryRouter
  .post('/', ProvidersHasCategories.create)
  .get('/', ProvidersHasCategories.getAll)
  .get('/:id', ProvidersHasCategories.getById)
  .put('/:id', ProvidersHasCategories.update)
  .delete('/:id', ProvidersHasCategories.remove)

export default ProviderHasCategoryRouter
