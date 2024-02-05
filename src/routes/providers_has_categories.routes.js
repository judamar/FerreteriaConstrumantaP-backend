import { Router } from 'express'
import ProvidersHasCategories from '../controllers/providers_has_categories.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const ProviderHasCategoryRouter = Router()

ProviderHasCategoryRouter.use(authUser, authAdmin)

ProviderHasCategoryRouter
  .post('/', ProvidersHasCategories.create)
  .get('/', ProvidersHasCategories.getAll)
  .delete('/:provId', ProvidersHasCategories.remove)

export default ProviderHasCategoryRouter
