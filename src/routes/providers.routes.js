import { Router } from 'express'
import Provider from '../controllers/providers.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const ProviderRouter = Router()

// Middleware for authenticathe the user and check if is admin
ProviderRouter.use(authUser, authAdmin)

/* `ProviderRouter` is a router object that handles the routes related to providers. It imports the
`Router` object from the `express` library and creates an instance of it. It then uses the
`authUser` and `authAdmin` middlewares to authenticate the user and check if they have admin
privileges before allowing access to the routes. The router defines several HTTP methods (`post`,
`get`, `put`, `delete`) and their corresponding routes (`/`, `/id/:id`, `/search/:name`,
`/nit/:nit`) that are handled by the `Provider` controller. */
ProviderRouter
  .post('/', Provider.create)
  .get('/', Provider.getAll)
  .get('/id/:id', Provider.getById)
  .get('/search/:name', Provider.getByName)
  .get('/nit/:nit', Provider.getByNIT)
  .put('/:id', Provider.update)
  .delete('/:id', Provider.remove)

export default ProviderRouter
