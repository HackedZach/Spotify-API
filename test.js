import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(
    'BQDJUngLYa7YSu_OFfvK6bU1S9EMGztqiSoUxOiw2yjRaDPtqMdDZ4Q8V7ZH7Dccm3_FW9kYxzk6RPPeO9Y'
)

spotifyApi.getTrack('4EWCNWgDS8707fNSZ1oaA5').then((data) => console.log(data))
