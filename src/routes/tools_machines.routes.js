import { Router } from 'express'
import multer from 'multer'
import ToolsMachines from '../controllers/tools_machines.controller.js'

const storage = multer.diskStorage({
  destination: 'src/images/public/',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const ToolsMachinesRouter = Router()

ToolsMachinesRouter
  .post('/', upload.single('image'), ToolsMachines.create)
  .get('/', ToolsMachines.getAll)
  .get('/:id', ToolsMachines.getById)
  .put('/:id', ToolsMachines.update)
  .delete('/:id', ToolsMachines.remove)

export default ToolsMachinesRouter
