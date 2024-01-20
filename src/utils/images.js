import 'dotenv/config'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

const CLIENT_ID = process.env.IMGUR_CLIENT_ID

export const imageToURL = async (filePath) => {
  try {
    const extension = path.extname(filePath).slice(1)
    const imageData = fs.readFileSync(filePath)

    const response = await axios.post('https://api.imgur.com/3/image', imageData, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
        'Content-Type': `image/${extension}`
      }
    })
    fs.unlinkSync(filePath)
    return response.data.data.link
  } catch (error) {
    console.error('Error', error)
    return null
  }
}
