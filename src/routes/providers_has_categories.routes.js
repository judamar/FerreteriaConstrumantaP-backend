import { Router } from 'express'
import ProvidersHasCategories from '../controllers/providers_has_categories.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const ProviderHasCategoryRouter = Router()

/* `ProviderHasCategoryRouter.use(authUser, authAdmin)` is applying the `authUser` and `authAdmin`
middlewares to all routes defined after this line of code. This means that before any request is
processed by these routes, the `authUser` and `authAdmin` middlewares will be executed to
authenticate and authorize the user making the request. */
ProviderHasCategoryRouter.use(authUser, authAdmin)

/* `ProviderHasCategoryRouter` is a router object that handles the routes related to the relationship
between providers and categories. It imports the `Router` object from the `express` library and
defines the routes for creating, getting all, and removing provider-category relationships. It also
applies the `authUser` and `authAdmin` middlewares to these routes. */
ProviderHasCategoryRouter
  .post('/', ProvidersHasCategories.create)
  .get('/', ProvidersHasCategories.getAll)
  .delete('/:provId', ProvidersHasCategories.remove)

export default ProviderHasCategoryRouter
