import { Router } from 'express'
import multer from 'multer'
import sendEmailController from '../controllers/send_email.controller.js'
import { authAdmin, authUser } from '../middlewares/authUser.js'

const storage = multer.diskStorage({
  destination: 'src/files/',
  filename: (req, file, cb) => {
    return cb(null, `Invoice_${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

const SendEmailRouter = Router()

SendEmailRouter.post('/', authUser, authAdmin, upload.single('file'), sendEmailController)

export default SendEmailRouter
