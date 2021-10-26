import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import {fileURLToPath} from 'url'
import {dirname} from 'path'

dotenv.config()
const {SERVER_PORT} = process.env

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use('/assets', express.static(path.join(__dirname, '../assets')))
app.listen(SERVER_PORT, () => {
    console.log(`Server is up on port ${SERVER_PORT}!`)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})
