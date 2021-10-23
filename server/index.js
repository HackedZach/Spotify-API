import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import SpotifyWebApi from 'spotify-web-api-node'
import fetch from 'node-fetch'

import {fileURLToPath} from 'url'
import {dirname} from 'path'
import {request} from 'http'

dotenv.config()
const {SERVER_PORT} = process.env

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const clientId = '579af8ae35fb49b9b075531206b8f73d'
const clientSecret = '965b1f8321f14da2a2ecd522ab74ab0e'

// private methods
const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials',
    })

    const data = await result.json()
    return data.access_token
}

const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(await getToken())

const app = express()
app.use(express.json())

app.use('/assets', express.static(path.join(__dirname, '../assets')))
app.listen(SERVER_PORT, () => {
    console.log(`Server is up on port ${SERVER_PORT}!`)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.post('/song', (req, res) => {
    if (req.body.search == null || req.body.search == '')
        return res.status(404).json('Error: you must specify search.')
    spotifyApi
        .searchTracks(req.body.search, {limit: 1, market: 'US'})
        .then((data) => res.json(data))
})
