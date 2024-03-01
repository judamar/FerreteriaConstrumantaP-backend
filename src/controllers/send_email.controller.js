import sendEmail from '../utils/email.js'
import pc from 'picocolors'
import { handleSuccess, handleServerError } from '../utils/handles.js'

const sendEmailController = (req, res) => {
  const body = {
    toEmail: req.body.toEmail,
    subject: req.body.subject,
    body: req.body.body,
    file: req.file.filename
  }
  try {
    const filename = `src/files/${body.file}`
    console.log(pc.bgGreen('SENDING EMAIL'))
    console.log({ Body: body })
    console.log({ Filename: filename })
    sendEmail(body.toEmail, body.subject, body.body, filename)
    handleSuccess(res, 200)
  } catch (error) {
    console.log(pc.bgRed(error.message))
    handleServerError(res, 'Error al enviar E-Mail')
  }
}

export default sendEmailController
