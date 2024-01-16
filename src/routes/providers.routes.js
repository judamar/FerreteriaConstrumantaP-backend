import { Router } from 'express'
import Provider from '../controllers/providers.controller.js'

const ProviderRouter = Router()

ProviderRouter
  .post('/', Provider.create)
  .get('/', Provider.getAll)
  .get('/id/:id', Provider.getById)
  .get('/search/:name', Provider.getByName)
  .get('/nit/:nit', Provider.getByNIT)
  .put('/:id', Provider.update)
  .delete('/:id', Provider.remove)

export default ProviderRouter
