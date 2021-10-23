import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();

const clientId = '579af8ae35fb49b9b075531206b8f73d';
const clientSecret = '965b1f8321f14da2a2ecd522ab74ab0e';

const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    spotifyApi.setAccessToken(data.access_token); 
    return data.access_token;
}

console.log(_getToken);