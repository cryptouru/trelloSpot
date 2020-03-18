import SpotifyWebApi from 'spotify-web-api-node'
import config from './config'

const clientId = config.SPOTIFY_CLIENT_ID
const clientSecret = config.SPOTIFY_CLIENT_SECRET

let spotifyClient

async function initClient () {
  // Create the api object with the credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
  })

  // Retrieve an access token.
  const credentials = await spotifyApi.clientCredentialsGrant()
  spotifyApi.setAccessToken(credentials.body.access_token)
  spotifyApi.setRefreshToken(credentials.body.refresh_token)
  return spotifyApi
}

async function getClient () {
  if (!spotifyClient) {
    spotifyClient = initClient()
  }
  return spotifyClient
}

export async function searchArtist (searchText) {
  const spotifyApi = await getClient()
  return spotifyApi.searchArtists(searchText)
};

export async function getArtistAlbums (artistId) {
  const spotifyApi = await getClient()
  let { body } = await spotifyApi.getArtistAlbums(artistId)
  let albums = body.items
  while (albums.length < body.total) {
    body = (await spotifyApi.getArtistAlbums(artistId, { offset: albums.length })).body
    albums = albums.concat(body.items)
  }
  return albums
};

export async function getArtistAlbumsWithName (artistName) {
  const { body } = await searchArtist(artistName)
  const bestMatch = body.artists.items[0].id
  return getArtistAlbums(bestMatch)
}
