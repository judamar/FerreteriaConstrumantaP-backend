import { Router } from 'express'
import multer from 'multer'
import ToolsMachines from '../controllers/tools_machines.controller.js'
import { authUser, authAdmin } from '../middlewares/authUser.js'

/* The code `const storage = multer.diskStorage({ ... })` is configuring the storage settings for the
uploaded files using the `multer` library in Node.js. */
const storage = multer.diskStorage({
  destination: 'src/images/public/',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const ToolsMachinesRouter = Router()

/* `ToolsMachinesRouter` is a router object that handles the routing for the `/tools_machines` endpoint
in an Express.js application. It defines various HTTP routes for creating, retrieving, updating, and
deleting tools and machines. It also includes middleware functions for authentication and file
uploading using the `multer` library. */
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
