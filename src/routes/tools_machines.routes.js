import { Router } from 'express'
import multer from 'multer'
import ToolsMachines from '../controllers/tools_machines.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

const storage = multer.diskStorage({
  destination: 'src/images/public/',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const ToolsMachinesRouter = Router()

ToolsMachinesRouter
  .post('/', authUser, authAdmin, upload.single('image'), ToolsMachines.create)
  .get('/', ToolsMachines.getAll)
  .get('/:id', ToolsMachines.getById)
  .get('/search/:name', ToolsMachines.getByName)
  .put('/:id', authUser, authAdmin, ToolsMachines.update)
  .patch('/:id', authUser, authAdmin, upload.single('image'), ToolsMachines.updateImage)
  .patch('/state/:id', authUser, authAdmin, ToolsMachines.updateState)
  .delete('/:id', authUser, authAdmin, ToolsMachines.remove)

export default ToolsMachinesRouter
