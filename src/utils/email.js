import nodemailer from 'nodemailer'
import 'dotenv/config'

/**
 * The `sendEmail` function sends an email with a specified subject, body, and attachment to a
 * specified email address using the Gmail SMTP server.
 * @param toEmail - The email address of the recipient to whom the email will be sent.
 * @param Subject - The subject of the email. It is a string that represents the subject line of the
 * email.
 * @param Body - The `Body` parameter is the content of the email that you want to send. It can be a
 * plain text or HTML content.
 * @param attachmentPath - The `attachmentPath` parameter is the file path of the attachment that you
 * want to include in the email. It should be a string representing the file path on your local
 * machine.
 */
const sendEmail = async (toEmail, Subject, Body, attachmentPath) => {
  const config = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD
    }
  }

  const msg = {
    from: process.env.NODEMAILER_USER,
    to: toEmail,
    subject: Subject,
    text: Body,
    attachments: [
      {
        path: attachmentPath
      }
    ]
  }

  const transport = nodemailer.createTransport(config)

  const info = await transport.sendMail(msg)

  console.log(info)
}

sendEmail('juansantiagovega111@gmail.com', 'Test Backend', 'Test correo a pingu', 'src/images/public/logo.ico')
