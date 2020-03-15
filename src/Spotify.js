import SpotifyWebApi from 'spotify-web-api-node'

export default class SpotifyWrapper {
  static async getInstance () {
    if (!SpotifyWrapper.instance) {
      await SpotifyWrapper.init()
    }
    return SpotifyWrapper.instance
  }

  static async getClient () {
    await SpotifyWrapper.getInstance()
    return SpotifyWrapper.instance.client
  }

  static refreshClient () {
    return SpotifyWrapper.instance.client.refreshAccessToken()
  }

  static async init () {
    const clientId = 'cae2dbbf59e04cfb9b8e8dbe08240cb9'
    const clientSecret = '777ade2401234af5bcfa28928b681898'

    // Create the api object with the credentials
    var spotifyApi = new SpotifyWebApi({
      clientId: clientId,
      clientSecret: clientSecret
    })

    // Retrieve an access token.
    const credentials = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(credentials.body.access_token)
    spotifyApi.setRefreshToken(credentials.body.refresh_token)

    console.log('The token expires in ' + credentials.body.expires_in)
    console.log('The access token is ' + credentials.body.access_token)
    console.log('The refresh token is ' + credentials.body.refresh_token)

    this.token = credentials.body.access_token
    this.refreshToken = credentials.body.refresh_token
    this.expires = credentials.body.expires_in
    this.client = spotifyApi
    SpotifyWrapper.instance = this
  }

  static async search (searchText) {
    const spotifyApi = await SpotifyWrapper.getClient()
    return spotifyApi.searchTracks(searchText)
  };

  static async searchArtist (searchText) {
    const spotifyApi = await SpotifyWrapper.getClient()
    return spotifyApi.searchArtists(searchText)
  };

  static async getArtistAlbums (artistId) {
    const spotifyApi = await SpotifyWrapper.getClient()
    let { body } = await spotifyApi.getArtistAlbums(artistId)
    let albums = body.items
    while (albums.length < body.total) {
      body = (await spotifyApi.getArtistAlbums(artistId, { offset: albums.length })).body
      albums = albums.concat(body.items)
    }
    return albums
  };

  static async getArtistAlbumsWithName (artistName) {
    const { body } = await SpotifyWrapper.searchArtist(artistName)
    const bestMatch = body.artists.items[0].id
    return SpotifyWrapper.getArtistAlbums(bestMatch)
  }
}
