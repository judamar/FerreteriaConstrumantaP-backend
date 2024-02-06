import nodemailer from 'nodemailer'
import 'dotenv/config'

const sendEmail = async (toEmail, Subject, Body) => {
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
    text: Body
  }

  const transport = nodemailer.createTransport(config)

  const info = await transport.sendMail(msg)

  console.log(info)
}

sendEmail('xxxxxxxxxxxx@xxxxxx.com', 'Test Backend', 'Test')
